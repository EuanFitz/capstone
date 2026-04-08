const form = document.getElementById('update');

const escapeHTML = (str) => str.replace(/[&<>"']/g, 
  tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag] || tag)
);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const displayName = escapeHTML(document.getElementById('display').value);
  const email = escapeHTML(document.getElementById('email').value);
  const bio = escapeHTML(document.getElementById('bio').value);

  try {
    const res = await fetch('/api/auth/update', { 
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