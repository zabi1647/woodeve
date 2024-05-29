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

// Function to update the cart sidebar
const updateCartSidebar = function () {
  cartItems.innerHTML = '';
  cart.forEach((product, index) => {
    const [productName, productImage] = product.split('#');
    const listItem = document.createElement('li');
    
    const image = document.createElement('img');
    image.src = productImage;
    image.width = 50; // Adjust size as needed
    image.height = 50; // Adjust size as needed
    listItem.appendChild(image);

    const text = document.createTextNode(` ${productName}`);
    listItem.appendChild(text);

    cartItems.appendChild(listItem);
  });
}

// Event listener for "add to cart" buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', function () {
    // Find the closest product card
    const productCard = button.closest('.product-card');
    
    // Get the product name and image address
    const productName = productCard.querySelector('img').getAttribute('alt');
    const productImage = productCard.querySelector('img').getAttribute('src');
    
    // Combine product name and image address
    const productInfo = `${productName}#${productImage}`;

    // Add product info to cart array
    cart.push(productInfo);
    console.log(cart);

    // Update the cart badge and sidebar
    updateCartBadge();
    updateCartSidebar();
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
