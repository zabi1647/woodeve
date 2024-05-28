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

const favBadge = document.querySelector('.fav-add');
const addToFavButtons = document.querySelectorAll('.card-action-btn[title="aadd to whishlist"]');

// Function to update the cart badge
const updateCartBadge = function () {
  cartBadge.textContent = cart.length;
}

// Event listener for "add to cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Find the closest product card
    const productCard = button.closest('.product-card');
    
    // Get the product ID (you may need to modify this to match your product ID retrieval method)
    const productId = productCard.querySelector('img').getAttribute('alt');

    // Add product ID to cart array
    cart.push(productId);
    console.log(cart);

    // Update the cart badge
    updateCartBadge();
  });
});
