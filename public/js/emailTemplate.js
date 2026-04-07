// ----------------------------To: dropdown ----
const addToBtn = document.querySelector('.emailField-to .emailButton');
const toDropdown = document.getElementById('emailTo');
const recipientTags = document.getElementById('recipientTags');

toDropdown.style.display = 'none';

const toOverlay = document.createElement('div');
toOverlay.className = 'dropdown';
toOverlay.id = 'toDropdown';
['Human Resources', 'Marketing', 'Sales', 'Finance', 'All Staff'].forEach(opt => {
    const item = document.createElement('div');
    item.className = 'dropdownItem';
    item.textContent = opt;
    item.addEventListener('click', () => {
        addTag(opt);
        toOverlay.classList.remove('show');
    });
    toOverlay.appendChild(item);
});
addToBtn.parentElement.appendChild(toOverlay);

addToBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toOverlay.classList.toggle('show');
    fromOverlay.classList.remove('show');
});

function addTag(val) {
    const existing = [...recipientTags.querySelectorAll('.tag')].map(t => t.dataset.value);
    if (existing.includes(val)) return;
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.dataset.value = val;
    tag.innerHTML = `${val} <button type="button" onclick="this.parentElement.remove()">×</button>`;
    recipientTags.appendChild(tag);
}

// ------------------------------From: dropdown ----
const fromBtn = document.querySelector('.emailField-from .emailButton');
const fromSelect = document.getElementById('emailFrom');
const fromValueDisplay = document.getElementById('fromValue');

fromSelect.style.display = 'none';

const fromOverlay = document.createElement('div');
fromOverlay.className = 'dropdown fromDropdown';
fromOverlay.id = 'fromDropdown';

const fromTitle = document.createElement('p');
fromTitle.className = 'dropdownTitle';
fromTitle.textContent = 'Appear to be from:';
fromOverlay.appendChild(fromTitle);

['Manager', 'Area Manager', 'CFO', 'Human Resources', 'IT Department'].forEach(opt => {
    const item = document.createElement('div');
    item.className = 'dropdownItem';
    item.textContent = opt;
    item.addEventListener('click', () => {
        fromValueDisplay.textContent = opt;
        updateSignature(opt);
        fromOverlay.classList.remove('show');
    });
    fromOverlay.appendChild(item);
});
fromBtn.parentElement.appendChild(fromOverlay);

fromBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    fromOverlay.classList.toggle('show');
    toOverlay.classList.remove('show');
});

// -----------------------------------Signature auto-fill ----
const signatures = {
    'Manager': 'Best regards,\nYour Manager\nmanager@company.com',
    'Area Manager': 'Regards,\nArea Management Team\nareamanager@company.com',
    'CFO': 'Sincerely,\nChief Financial Officer\ncfo@company.com',
    'Human Resources': 'Kind regards,\nHuman Resources Department\nhr@company.com',
    'IT Department': 'Thank you,\nIT Support Team\nit.support@company.com'
};

function updateSignature(sender) {
    const sigEl = document.getElementById('emailSignature');
    sigEl.textContent = signatures[sender] || '';
}

// -----------------------------------Template loading ----
function loadTemplate(card, content) {

    document.querySelectorAll('.templateCard').forEach(c => {
        c.classList.remove('active');
    });

    card.classList.add('active');

    document.getElementById('emailBody').value = content.replace(/\\n/g, '\n');
}


document.querySelectorAll('.templateCard').forEach(card => {
    card.addEventListener('click', () => {
        loadTemplate(card, card.dataset.content);
    });
});

// ---- Link display text editor ----
const linkTextInput = document.getElementById('linkDisplayText');
const linkPreview = document.getElementById('linkPreview');

linkTextInput.addEventListener('input', () => {
    // updates the preview anchor text as admin types
    linkPreview.textContent = linkTextInput.value || 'Click here';
});

//-----Load first template by default
const firstCard = document.querySelector('.templateCard.active');
if (firstCard) {
    loadTemplate(firstCard, firstCard.dataset.content);
}

// --------------------------Close dropdowns on outside click ----
document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('show'));
});

 // ---------------------------Save button ----
// document.getElementById('save').addEventListener('click', (e) => {
//     e.preventDefault();
//     const name = document.getElementById('templateName')?.value || 'Untitled';
//     alert(`Template "${name}" has been saved!`);
//     // TO-DO: wire to POST /api/admin/templates - RP
// });

// ---- Delete button ----
document.querySelector('#delete').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm('Delete this template?')) {
        document.querySelector('#emailBody').value = '';
        document.querySelector('#emailSignature').textContent = '';
        document.querySelector('#fromValue').textContent = 'Select sender...';
        document.querySelector('#templateName').value = '';
        recipientTags.innerHTML = '';
    }
});

document.querySelector("#launchButton").addEventListener('click', (e) => {
    alert(`Template "${name}" has been saved!`);
})