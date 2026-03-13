// Simple cart system using localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  cartCount.textContent = cart.length;
}

// Add to Cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.parentElement.querySelector('h3').innerText;
    const price = button.parentElement.querySelector('p').innerText;

    // Add product to cart
    cart.push({ product, price });

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update cart count badge
    updateCartCount();

    // Animate pulse effect
    const cartCount = document.getElementById('cart-count');
    cartCount.classList.add('pulse');
    setTimeout(() => cartCount.classList.remove('pulse'), 500);
  });
});

// Initialize cart count on page load
updateCartCount();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Back to Top functionality
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = 'block';
    backToTopBtn.style.opacity = '1';
  } else {
    backToTopBtn.style.opacity = '0';
    setTimeout(() => {
      if (window.scrollY <= 300) backToTopBtn.style.display = 'none';
    }, 300);
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hamburger Menu functionality
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
