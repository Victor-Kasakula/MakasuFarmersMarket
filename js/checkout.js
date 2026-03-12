// Load cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Place Order → save summary + redirect
document.getElementById('checkout-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const payment = document.querySelector('input[name="payment"]:checked').value;
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;

  const orderSummary = { name, address, phone, payment, cart };
  localStorage.setItem('orderSummary', JSON.stringify(orderSummary));

  window.location.href = "thankyou.html";
});

// WhatsApp button → send order
document.getElementById('send-whatsapp').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const address = document.getElementById('address').value;
  const phone = document.getElementById('phone').value;
  const payment = document.querySelector('input[name="payment"]:checked').value;

  let message = `Makasu Farmers Market Order\n\n`;
  message += `Name: ${name}\nAddress: ${address}\nPhone: ${phone}\nPayment: ${payment}\n\nItems:\n`;

  cart.forEach(item => {
    message += `- ${item.product} (${item.price})\n`;
  });

  const total = cart.reduce((sum, item) => sum + parseInt(item.price.replace(/\D/g, ''), 10), 0);
  message += `\nTotal Price: MK ${total}\n\nThank you for shopping with us!`;

  const sellerNumber = "265998838866"; // your real number
  const whatsappUrl = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank");
});
