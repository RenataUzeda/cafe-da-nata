const navbar = document.querySelector(".navbar").offsetTop + 40;

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); 

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    let targetPosition = targetElement.offsetTop - navbar;

    if (window.innerWidth <= 768) { 
      targetPosition = targetElement.offsetTop - (navbar + 25);
    }

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth", 
    });
  });
});

const menuButton = document.querySelector(".menu-resp");
const closeButton = document.querySelector(".fechar-resp");
const navbarMobile = document.querySelector(".navbar");

menuButton.addEventListener("click", () => {
  navbarMobile.classList.add("active"); 
});


closeButton.addEventListener("click", () => {
  navbarMobile.classList.remove("active"); 
});


document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function () {
    navbarMobile.classList.remove("active"); 
  });
});

