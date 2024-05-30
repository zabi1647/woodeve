'use strict';

/**
 * add event on element
 */
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

/**
 * navbar toggle
 */
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 * header & back top btn active when window scroll down to 100px
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const showElemOnScroll = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", showElemOnScroll);

/**
 * product filter
 */
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterBox = document.querySelector("[data-filter]");

let lastClickedFilterBtn = filterBtns[0];

const filter = function () {
  lastClickedFilterBtn.classList.remove("active");
  this.classList.add("active");
  lastClickedFilterBtn = this;

  filterBox.setAttribute("data-filter", this.dataset.filterBtn);
}

addEventOnElem(filterBtns, "click", filter);

/**
 * Add to cart functionality
 */
let cart = [];
const cartBadge = document.querySelector('.cart-add');
const addToCartButtons = document.querySelectorAll('.card-action-btn[title="add to cart"]');
const cartButton = document.getElementById('cartButton');
const cartItems = document.getElementById('cartItems');

const updateCartBadge = function () {
  cartBadge.textContent = cart.length;
}


// Event listener for "add to cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    const productCard = button.closest('.product-card');
  
    const productName = productCard.querySelector('img').getAttribute('alt');
    const productImage = productCard.querySelector('img').getAttribute('src');
    const productPrice = productCard.querySelector('.price').textContent;
  
    const productInfo = `${productName}#${productImage}#${productPrice}`;

    cart.push(productInfo);
    console.log(cart);

    updateCartBadge();
  });
});

// Function to save cart data to localStorage
const saveCartToLocalStorage = function () {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Cart data saved to localStorage:', cart);
}

// Event listener for the cart button to navigate to the checkout page
cartButton.addEventListener('click', function () {
  if (cart.length > 0) {
    saveCartToLocalStorage();
    window.location.href = 'checkout.html';
  }else{
    alert('Please add some items to cart');
  }
});
