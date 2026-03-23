const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', async (e) =>{
    e.preventDefault();
    const res = await fetch('api/auth/logout', {
        method: 'POST',
    });
    if(res.ok){
        window.location.href = '/login';
    }
});  