
// const form = document.querySelector('#login');

// form.addEventListener('submit', async (e) =>{
//     e.preventDefault();
//       try {
//     // perform a POST fetch on the /api/auth/register route
//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       // send application/json type header
//       headers: { "Content-Type": "application/json" },

//       body: JSON.stringify({
//         username: e.target.username.value,
//         password: e.target.password.value,
//       }),
//     });

//     const data = await res.json();

//     //If the respone is good status 200-299
//     if (res.ok) {
//       window.location.href = '/faq';
//     }else{
//       console.error("Something went wrong", error);
//     }
//   } catch (error) {
//     console.error("Something went wrong", error);
//   }
// });

//rachel fucking around with this.
const form = document.getElementById('login');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/api/auth/login', { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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