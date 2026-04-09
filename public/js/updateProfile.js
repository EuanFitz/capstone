
const profileForm = document.getElementById('profileForm');
const passwordForm = document.getElementById('passwordForm');
const escapeHTML = (str) => str.replace(/[&<>"']/g, 
  tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag] || tag)
);

//======================================
//===========UPDATE PROFILE=============
//======================================
profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const displayName = escapeHTML(e.target.displayName.value);
  const email = escapeHTML(e.target.email.value);
  const bio = escapeHTML(e.target.bio.value);
  
  try {
    const res = await fetch('/api/updateProfile/update', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ displayName, email, bio })
    });

    const data = await res.json();

    if (res.ok) {
      // No localStorage needed. token is in httpOnly cookie
      window.location.href = '/profile'; // 
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
});



//======================================
//===========UPDATE PASSWORD============
//======================================
passwordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const currentPassword = e.target.currentPassword.value;
  const newPassword = e.target.newPassword.value;
  
  try {
    const res = await fetch('/api/updateProfile/newPassword', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword })
    });

    const data = await res.json();

    if (res.ok) {
      // No localStorage needed. token is in httpOnly cookie
      window.location.href = '/profile'; //
      alert("Password changed successful"); 
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
});