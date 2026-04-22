const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const twilio = require('twilio');
const { ElevenLabsClient } = require('@elevenlabs/elevenlabs-js');
const authMiddleware = require('../middleware/auth');
const authorize = require('../middleware/authorization');
const User = require('../model/User');
const VishingCampaign = require('../model/VishingCampaign');

// ── Clients ──────────────────────────────────────────────────────────────────
const elevenlabs = new ElevenLabsClient({ apiKey: process.env.ELEVENLABS_API_KEY });
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// ── Multer (audio upload storage) ────────────────────────────────────────────
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, '../uploads/voice-samples');
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// ── GET /api/vishing ─ render the vishing page ───────────────────────────────
router.get('/', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const users = await User.find({}, 'displayName username email voiceCloneId');
        res.render('pages/vishing-setup', { user: req.user, users });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to load vishing page' });
    }
});

// ── POST /api/vishing/clone ─ upload audio + clone voice in ElevenLabs ───────
router.post('/clone', authMiddleware, authorize('admin'), upload.single('audioSample'), async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

    const voiceClone = await elevenlabs.voices.ivc.create({
        name: `${user.displayName || user.username}-clone`,
        files: [fs.createReadStream(req.file.path)],
    });

        user.voiceCloneId = voiceClone.voiceId;
        await user.save();

        fs.unlinkSync(req.file.path);

        console.log('voiceClone object:', voiceClone);
        res.json({ success: true, voiceCloneId: voiceClone.voiceId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Voice cloning failed', error: err.message });
    }
});

// ── POST /api/vishing/generate ─ generate audio from script ─────────────────
router.post('/generate', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const { voiceCloneId, script } = req.body;
        if (!voiceCloneId || !script) {
            return res.status(400).json({ message: 'voiceCloneId and script are required' });
        }

        const audioStream = await elevenlabs.textToSpeech.convert(voiceCloneId, {
            text: script,
            model_id: 'eleven_turbo_v2_5',
            voice_settings: { stability: 0.5, similarity_boost: 0.75 }
        });

        const outputDir = path.join(__dirname, '../output');
        fs.mkdirSync(outputDir, { recursive: true });
        const fileName = `vishing-${Date.now()}.mp3`;
        const filePath = path.join(outputDir, fileName);

        const chunks = [];
        for await (const chunk of audioStream) {
        chunks.push(chunk);
    }
        const audioBuffer = Buffer.concat(chunks);
        fs.writeFileSync(filePath, audioBuffer);

        res.json({ success: true, audioUrl: `/audio/${fileName}` });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Audio generation failed', error: err.message });
    }
});

// ── POST /api/vishing/send ─ deliver voicemail + SMS to targets ──────────────
router.post('/send', authMiddleware, authorize('admin'), async (req, res) => {
    try {
        const { targets, audioUrl } = req.body;
        console.log('Send route hit. Targets:', targets, 'AudioUrl:', audioUrl);
        if (!targets || !audioUrl) {
            return res.status(400).json({ message: 'targets and audioUrl are required' });
        }

        const results = [];

        for (const phoneNumber of targets) {
            try {
                await twilioClient.calls.create({
                    to: phoneNumber,
                    from: process.env.TWILIO_PHONE_NUMBER,
                    machineDetection: 'DetectMessageEnd',
                    asyncAmd: 'true',
                    asyncAmdStatusCallback: `${process.env.APP_URL}/api/vishing/amd-callback?audioUrl=${encodeURIComponent(audioUrl)}`,
                    asyncAmdStatusCallbackMethod: 'POST',
                    url: `${process.env.APP_URL}/api/vishing/twiml-wait`,
});

                setTimeout(async () => {
                    await twilioClient.messages.create({
                        to: phoneNumber,
                        from: process.env.TWILIO_PHONE_NUMBER,
                        body: `This is urgent. I need you on this call NOW before we lose the window. Do not discuss this with anyone else. Join here: https://teams.clicksafe-demo.com/emergency-board-call`
                    });
                }, 30000);

                results.push({ phoneNumber, status: 'delivered' });
            } catch (err) {
                results.push({ phoneNumber, status: 'failed', error: err.message });
            }
        }

        res.json({ success: true, results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Send failed', error: err.message });
    }
});

// ── GET /api/vishing/twiml ─ TwiML instruction for Twilio call ───────────────
router.all('/twiml', (req, res) => {
    const audioUrl = req.query.audioUrl || req.body.audioUrl;
    const fullAudioUrl = `${process.env.APP_URL}${audioUrl}`;
    console.log('TwiML hit. Full audio URL:', fullAudioUrl);
    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Play>${fullAudioUrl}</Play></Response>`;
    console.log('Serving TwiML:', twiml);
    res.type('text/xml');
    res.send(twiml);
});

// Initial TwiML — just wait silently while AMD detects
router.all('/twiml-wait', (req, res) => {
    res.type('text/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?><Response><Pause length="30"/></Response>`);
});

// AMD callback — only play audio if voicemail detected
router.all('/amd-callback', async (req, res) => {
    const answeredBy = req.body.AnsweredBy;
    const callSid = req.body.CallSid;
    const audioUrl = req.query.audioUrl;
    const fullAudioUrl = `${process.env.APP_URL}${audioUrl}`;
    console.log('AMD callback - answeredBy:', answeredBy, 'callSid:', callSid);

    res.sendStatus(200);

    if (answeredBy === 'machine_end_beep' || answeredBy === 'machine_end_silence') {
        try {
            await twilioClient.calls(callSid).update({
                twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Play>${fullAudioUrl}</Play></Response>`
            });
        } catch (err) {
            console.error('Failed to update call:', err.message);
        }
    } else {
        try {
            await twilioClient.calls(callSid).update({
                twiml: `<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>`
            });
        } catch (err) {
            console.error('Failed to hang up call:', err.message);
        }
    }
});

module.exports = router;