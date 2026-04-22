

if (document.querySelector('#logout-form')) {
  const logoutButton = document.querySelector('#logout-form');
  logoutButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const { csrfToken } = await fetch('/csrf-token').then(res => res.json());

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken
        }
      });
      if (res.ok) {
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Logout failed:', err);
    }
  });
}