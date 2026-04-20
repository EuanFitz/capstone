


//rachel fucking around with this.
const form = document.getElementById('login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { csrfToken } = await fetch('/csrf-token').then(r => r.json());

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const res = await fetch('/api/auth/login', { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-csrf-token': csrfToken 
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log("status:", res.status); // what status is coming back
    console.log("data:", data); 
    if (res.ok) {
      // No localStorage needed. token is in httpOnly cookie
      window.location.href = '/profile'; // 
    } else {
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    alert('Something went wrong');
  }
});