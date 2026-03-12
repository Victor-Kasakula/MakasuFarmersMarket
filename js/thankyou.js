// Back to Top functionality
const backToTopBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Load order summary
const summaryContainer = document.getElementById('order-summary');
const orderSummary = JSON.parse(localStorage.getItem('orderSummary'));

if (orderSummary && orderSummary.cart && orderSummary.cart.length > 0) {
  let total = 0;
  let html = `<h3>Order Summary</h3>
              <p><strong>Name:</strong> ${orderSummary.name}</p>
              <p><strong>Address:</strong> ${orderSummary.address}</p>
              <p><strong>Phone:</strong> ${orderSummary.phone}</p>
              <p><strong>Payment:</strong> ${orderSummary.payment}</p>
              <ul>`;

  orderSummary.cart.forEach(item => {
    html += `<li>${item.product} - ${item.price}</li>`;
    const priceValue = parseInt(item.price.replace(/\D/g, ''), 10);
    total += priceValue;
  });

  html += `</ul>
           <p><strong>Total Price:</strong> MK ${total}</p>`;
  summaryContainer.innerHTML = html;

  // Clear cart AFTER showing summary
  localStorage.removeItem('cart');

  // Enable receipt download
  const downloadBtn = document.getElementById('download-receipt');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      let receiptText = `Makasu Farmers Market - Order Receipt\n\n`;
      receiptText += `Name: ${orderSummary.name}\n`;
      receiptText += `Address: ${orderSummary.address}\n`;
      receiptText += `Phone: ${orderSummary.phone}\n`;
      receiptText += `Payment: ${orderSummary.payment}\n\n`;
      receiptText += `Items:\n`;
      orderSummary.cart.forEach(item => {
        receiptText += `- ${item.product} (${item.price})\n`;
      });
      receiptText += `\nTotal Price: MK ${total}\n`;
      receiptText += `\nThank you for shopping with us!`;

      const blob = new Blob([receiptText], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "receipt.txt";
      link.click();
    });
  }
} else {
  summaryContainer.innerHTML = `<p>No order details found. Please return to the cart and try again.</p>`;
}
