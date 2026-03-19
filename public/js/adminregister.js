const goBackLink = document.querySelector(".backButton");
  goBackLink.addEventListener("click", (event) => {
    event.preventDefault(); 
    history.back();
  });