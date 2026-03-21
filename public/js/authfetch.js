// fetch send with the bearer token thing already connected/attached. 
// push user back to ogin if stuff goes wrong. 
// may need to change Dashboard route later on. -RP

async function authFetch(url, options = {}) {
  const token = localStorage.getItem('token');
 
  if (!token) {
    window.location.href = '/login';
    return;
  }
 
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers
  };
 
  const res = await fetch(url, { ...options, headers });
 
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/login';
    return;
  }
 
  return res;
}