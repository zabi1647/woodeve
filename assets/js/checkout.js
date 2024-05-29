// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItems = document.getElementById('cartItems');
const checkoutButton = document.getElementById('checkoutButton');
const checkoutForm = document.getElementById('checkoutForm');

// Populate cart items
const updateCartItems = function () {
  cartItems.innerHTML = '';
  cart.forEach((product, index) => {
    const [ productName,productImage, productPrice] = product.split('#');
    const listItem = document.createElement('li');
    
    const image = document.createElement('img');
    image.src = productImage;
    image.width = 50;
    image.height = 50;
    listItem.appendChild(image);

    const details = document.createElement('div');
    details.classList.add('product-details');
    
    const name = document.createElement('div');
    name.textContent = productName;
    details.appendChild(name);
    
    const price = document.createElement('div');
    price.textContent = `Price: ${productPrice}`;
    details.appendChild(price);

    listItem.appendChild(details);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-btn');
    removeButton.addEventListener('click', function () {
      cart.splice(index, 1);
      updateCartItems();
      saveCartToLocalStorage();
    });
    listItem.appendChild(removeButton);

    cartItems.appendChild(listItem);
  });
}

// Event listener for the checkout button to submit the form
checkoutButton.addEventListener('click', function () {
  // Handle form submission logic here
  if (checkoutForm.checkValidity()) {
    alert('Purchase completed!');
    // Clear the cart and update localStorage
    cart.length = 0;
    saveCartToLocalStorage();
    updateCartItems();
    window.location.href = 'index.html';
  } else {
    alert('Please fill out all required fields.');
  }
});

// Function to save cart data to localStorage
const saveCartToLocalStorage = function () {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log('Cart data saved to localStorage:', cart);
}

// Update cart items on page load
updateCartItems();
