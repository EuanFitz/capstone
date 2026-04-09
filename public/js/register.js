const goBackLink = document.querySelector(".backButton");
  goBackLink.addEventListener("click", (event) => {
    event.preventDefault(); 
    history.back();
  });

  const form = document.querySelector('#register');

  form.addEventListener('submit', async (e) =>{
    e.preventDefault();
      try {
    // perform a POST fetch on the /api/auth/register route
    const res = await fetch("/api/auth/register", {
      method: "POST",
      // send application/json type header
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        role: e.target.role.value
      }),
    });

    const data = await res.json();

    //If the respone is good status 200-299
    if (res.ok) {
      window.location.href = '/profile';
    }else{
      console.log(error);
      alert(data.message || 'Registration failed');
    }
  } catch (error) {
    console.error("Something went wrong", error);
  }
});