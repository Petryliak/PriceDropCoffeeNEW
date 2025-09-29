// Ініціалізація EmailJS
emailjs.init('ySjJdtMG4dI5s7nuN');

document.addEventListener('DOMContentLoaded', () => {
  renderOrderSummary();

  document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
      alert("Кошик порожній");
      return;
    }

    // Формуємо список замовлення і підраховуємо суму
    let total = 0;
    const orderDetails = cart.map(item => {
      total += Number(item.price); // додаємо до загальної суми
      return `${item.name} — ${item.price} грн`;
    }).join('\n');

    // Дані для EmailJS
    const params = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      city: document.getElementById("city").value,
      post: document.getElementById("post").value,
      order: orderDetails,
      total: total + " грн" // додаємо загальну суму
    };

    // Надсилаємо email через EmailJS
    emailjs.send("service_0t37z7i", "template_vqoq74p", params)
      .then(() => {
        alert("Замовлення надіслано!");
        localStorage.removeItem("cart"); // очищаємо кошик
        window.location.href = "index.html"; // редірект
      })
      .catch((err) => {
        alert("Помилка при надсиланні: " + JSON.stringify(err));
      });
  });
});

// Функція для відображення замовлення на сторінці
function renderOrderSummary() {
  const summaryDiv = document.getElementById('order-summary');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  if (cart.length === 0) {
    summaryDiv.innerHTML = "<p>Кошик порожній.</p>";
  } else {
    let total = 0;
    let html = "<h3>Ваше замовлення:</h3><ul>";
    cart.forEach(item => {
      total += Number(item.price);
      html += `<li>${item.name} — ${item.price} грн</li>`;
    });
    html += `</ul><p><strong>Загальна сума: ${total} грн</strong></p>`;
    summaryDiv.innerHTML = html;
  }
}
