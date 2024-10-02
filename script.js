const navbar = document.querySelector(".navbar, .btn-home").offsetTop + 40;

document.querySelectorAll(".navbar a, .btn-home").forEach((link) => {
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

//_______

const btnRemoveProduct = document.getElementsByClassName("cart-btn-remove");
for (let i = 0; i < btnRemoveProduct.length; i++) {
  btnRemoveProduct[i].addEventListener("click", removeProduct);
}

function removeProduct(event) {
  event.target.closest(".cart-product").remove();
  updateTotal();
}

const inputsQtd = document.getElementsByClassName("cart-product-qtd");
for (let i = 0; i < inputsQtd.length; i++) {
  inputsQtd[i].addEventListener("change", updateTotal);
}

const btnAddToCars = document.getElementsByClassName("btn-add-cars");
for (let i = 0; i < btnAddToCars.length; i++) {
  btnAddToCars[i].addEventListener("click", addProduct);
}

function addProduct(event) {
  const button = event.target;
  const productInfos = button.closest(".box-menu");
  const productImg = productInfos.querySelector("img").src;
  const productDesc = productInfos.querySelector("h3").innerText;
  const productPrice = productInfos
    .querySelector(".price")
    .innerText.split(" ")[1]
    .replace(",", ".");

  const productsCarName = document.getElementsByClassName("cart-product-title");
  console.log(productsCarName);

  for (let i = 0; i < productsCarName.length; i++) {
    if (productsCarName[i].innerText === productDesc) {
      productsCarName[i]
        .closest(".cart-product")
        .getElementsByClassName("cart-product-qtd")[0].value++;
      return;
    }
  }

  let newCartProduct = document.createElement("tr");
  newCartProduct.classList.add("cart-product");

  newCartProduct.innerHTML = `
  <td class="product-identification">
            <img class="cart-product-img" src="${productImg}" alt="Xícara de Café">
            <strong class="cart-product-title">${productDesc}</strong>
          </td>
          <td>
            <span class="cart-product-price">R$ ${productPrice}</span>
          </td>
          <td class="cart-input">
            <input class="cart-product-qtd" type="number" value="1" min="1">
            <button class="cart-btn-remove" type="button">Remover</button>
          </td>
  `;
  const tableBody = document.querySelector(".cart-table tbody");
  tableBody.append(newCartProduct);

  updateTotal();
  newCartProduct
    .getElementsByClassName("cart-product-qtd")[0]
    .addEventListener("change", updateTotal);
  newCartProduct
    .getElementsByClassName("cart-btn-remove")[0]
    .addEventListener("click", removeProduct);
}

function updateTotal() {
  let totalCart = 0;

  const cartProducts = document.getElementsByClassName("cart-product");
  for (let i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i]
      .getElementsByClassName("cart-product-price")[0]
      .innerText.replace("R$", "")
      .replace(",", ".");
    const productQtd =
      cartProducts[i].getElementsByClassName("cart-product-qtd")[0].value;

    totalCart += productPrice * productQtd;
  }

  document.querySelector(".cart-total span").innerText =
    "R$ " + totalCart.toFixed(2).replace(".", ",");
}

