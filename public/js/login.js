
const form = document.querySelector('#login');

form.addEventListener('submit', async (e) =>{
    e.preventDefault();
      try {
    // perform a POST fetch on the /api/auth/register route
    const res = await fetch("/api/auth/login", {
      method: "POST",
      // send application/json type header
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await res.json();

    //If the respone is good status 200-299
    if (res.ok) {
      window.location.href = '/faq';
    }else{
      console.error("Something went wrong", error);
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
});