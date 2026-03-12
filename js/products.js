// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement.querySelector('h3').innerText;
    const price = button.parentElement.querySelector('p').innerText;

    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));

    updateCartCount();

    const cartCount = document.getElementById('cart-count');
    cartCount.classList.add('pulse');
    setTimeout(() => cartCount.classList.remove('pulse'), 300);
  });
});

// Filter products by category
document.getElementById('category-filter').addEventListener('change', (e) => {
  filterProducts();
});

// Search products by name
document.getElementById('search-bar').addEventListener('input', () => {
  filterProducts();
});

function filterProducts() {
  const selectedCategory = document.getElementById('category-filter').value;
  const searchQuery = document.getElementById('search-bar').value.toLowerCase();

  document.querySelectorAll('.card').forEach(card => {
    const categoryMatch = (selectedCategory === 'all' || card.dataset.category === selectedCategory);
    const nameMatch = card.querySelector('h3').innerText.toLowerCase().includes(searchQuery);

    if (categoryMatch && nameMatch) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize cart count
updateCartCount();


// Back to Top functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
