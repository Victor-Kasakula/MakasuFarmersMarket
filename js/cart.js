// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartList = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');
const clearCartBtn = document.getElementById('clear-cart');
const proceedBtn = document.getElementById('proceed-to-payment');
const cartCountBadge = document.getElementById('cart-count'); // badge in header
const itemCountEl = document.getElementById('item-count'); // text summary

// Render cart items
function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = `${item.product} - ${item.price}`;

    // Remove button for each item
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.style.marginLeft = '10px';
    removeBtn.addEventListener('click', () => {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });

    li.appendChild(removeBtn);
    cartList.appendChild(li);

    // Extract numeric price (assumes format "Price: MK xxxx")
    const priceValue = parseInt(item.price.replace(/\D/g, ''), 10);
    total += priceValue;
  });

  // Update totals
  totalPriceEl.textContent = `Total: MK ${total}`;

  // Update cart badge count
  if (cartCountBadge) {
    cartCountBadge.textContent = cart.length;
  }

  // Show item count text (e.g., "3 items in cart")
  if (itemCountEl) {
    itemCountEl.textContent = `${cart.length} item${cart.length !== 1 ? 's' : ''} in cart`;
  }

  // Disable Proceed button if cart is empty
  proceedBtn.disabled = cart.length === 0;
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

// Proceed to checkout
proceedBtn.addEventListener('click', () => {
  window.location.href = "checkout.html";
});

// Initial render
renderCart();
