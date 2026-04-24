                const generateBtn = document.getElementById('generateBtn');
        const sendBtn = document.getElementById('sendBtn');
        const addManualBtn = document.getElementById('addManualBtn');
        const addFromDbBtn = document.getElementById('addFromDbBtn');
        const previewSection = document.getElementById('previewSection');
        const sendSection = document.getElementById('sendSection');
        const audioPreview = document.getElementById('audioPreview');
        const generateStatus = document.getElementById('generateStatus');
        const sendStatus = document.getElementById('sendStatus');
        const targetList = document.getElementById('targetList');

        let targets = [];
        let currentAudioUrl = null;

        let csrfToken = null;

        async function getCsrfToken() {
            if (csrfToken) return csrfToken;
            const res = await fetch('/csrf-token');
            const data = await res.json();
            csrfToken = data.csrfToken;
            return csrfToken;
}

        // ── Generate voice preview ────────────────────────────────────────────
        generateBtn.addEventListener('click', async () => {
            const employeeId = document.getElementById('employeeSelect').value;
            const selectedOption = document.getElementById('employeeSelect').selectedOptions[0];
            const existingCloneId = selectedOption?.dataset.cloneId;
            const script = document.getElementById('script').value.trim();
            const audioSample = document.getElementById('audioSample').files[0];

            if (!employeeId) return setStatus(generateStatus, 'Please select an employee.', 'error');
            if (!script) return setStatus(generateStatus, 'Please enter a script.', 'error');

            generateBtn.disabled = true;
            setStatus(generateStatus, 'Processing...', 'info');

            try {
                let voiceCloneId = existingCloneId;

                // If no existing clone, upload sample and clone first
                if (!voiceCloneId) {
                    if (!audioSample) {
                        generateBtn.disabled = false;
                        return setStatus(generateStatus, 'This employee has no voice clone. Please upload an audio sample.', 'error');
                    }

                    const formData = new FormData();
                    formData.append('userId', employeeId);
                    formData.append('audioSample', audioSample);

                    const cloneRes = await fetch('/api/vishing/clone', {
                        method: 'POST',
                        headers: {
                            'x-csrf-token': await getCsrfToken()
                        },
                        body: formData
                    });
                    const cloneData = await cloneRes.json();
                    console.log('clone response:', cloneData);
                    if (!cloneRes.ok) throw new Error(cloneData.message);
                    voiceCloneId = cloneData.voiceCloneId;
                }

                // Generate audio
                const genRes = await fetch('/api/vishing/generate', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json', 
                        'x-csrf-token': await getCsrfToken()
                    },
                    body: JSON.stringify({ voiceCloneId, script })
                });
                const genData = await genRes.json();
                if (!genRes.ok) throw new Error(genData.message);

                currentAudioUrl = genData.audioUrl;
                audioPreview.src = currentAudioUrl;
                previewSection.classList.remove('hidden');
                sendSection.classList.remove('hidden');
                setStatus(generateStatus, 'Audio generated successfully.', 'success');

            } catch (err) {
                setStatus(generateStatus, err.message, 'error');
            } finally {
                generateBtn.disabled = false;
            }
        });

        // ── Add target from DB dropdown ───────────────────────────────────────
        addFromDbBtn.addEventListener('click', () => {
            const select = document.getElementById('employeeTargetSelect');
            const phone = select.value;
            const name = select.selectedOptions[0]?.text;
            if (!phone) return;
            addTarget(phone, name);
        });

        // ── Add target manually ───────────────────────────────────────────────
        addManualBtn.addEventListener('click', () => {
            const input = document.getElementById('manualPhone');
            const phone = input.value.trim();
            if (!phone) return;
            addTarget(phone, phone);
            input.value = '';
        });

        function addTarget(phone, label) {
            if (targets.includes(phone)) return;
            targets.push(phone);
            renderTargets();
        }

        function removeTarget(phone) {
            targets = targets.filter(t => t !== phone);
            renderTargets();
        }

        function renderTargets() {
            if (targets.length === 0) {
            targetList.innerHTML = '<p class="hint">No targets added yet.</p>';
            return;
        }
            targetList.innerHTML = targets.map(phone => `
                <div class="target-chip">
                    <span>${phone}</span>
                    <button class="remove-target" data-phone="${phone}">&times;</button>
                </div>
            `).join('');

            targetList.querySelectorAll('.remove-target').forEach(btn => {
                btn.addEventListener('click', () => {
                removeTarget(btn.dataset.phone);
                });
            });
        }

        // ── Send campaign ─────────────────────────────────────────────────────
        sendBtn.addEventListener('click', async () => {
            if (!currentAudioUrl) return setStatus(sendStatus, 'Please generate audio first.', 'error');
            if (targets.length === 0) return setStatus(sendStatus, 'Please add at least one target.', 'error');

            sendBtn.disabled = true;
            setStatus(sendStatus, 'Sending...', 'info');

            try {
                const res = await fetch('/api/vishing/send', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'x-csrf-token': await getCsrfToken()
                    },
                    body: JSON.stringify({ targets, audioUrl: currentAudioUrl })
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.message);
                setStatus(sendStatus, 'Campaign sent successfully!', 'success');
            } catch (err) {
                setStatus(sendStatus, err.message, 'error');
            } finally {
                sendBtn.disabled = false;
            }
        });

        // ── Helper ────────────────────────────────────────────────────────────
        function setStatus(el, msg, type) {
            el.textContent = msg;
            el.className = `status-msg ${type}`;
        }