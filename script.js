const navbar = document.querySelector(".navbar").offsetTop + 40;

document.querySelectorAll(".navbar a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); 

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    const targetPosition = targetElement.offsetTop - navbar;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth", 
    });
  });
});
