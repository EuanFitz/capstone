const mongoose = require('mongoose');

const VishingCampaignSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    voiceCloneId: {
        type: String,
        required: true
    },
    clonedFromUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    script: {
        type: String,
        required: true
    },
    audioFileUrl: {
        type: String,
        default: null
    },
    targets: [
        {
            phoneNumber: { type: String, required: true },
            voicemailStatus: { type: String, enum: ['pending', 'delivered', 'failed'], default: 'pending' },
            smsStatus: { type: String, enum: ['pending', 'delivered', 'failed'], default: 'pending' },
            voicemailSentAt: { type: Date, default: null },
            smsSentAt: { type: Date, default: null }
        }
    ],
    status: {
        type: String,
        enum: ['draft', 'previewing', 'sent'],
        default: 'draft'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('VishingCampaign', VishingCampaignSchema);