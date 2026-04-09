const logoutButton = document.querySelector('#logout');

if (logoutButton) {
  logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  });
}