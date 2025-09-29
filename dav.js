document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector('.carusel-track');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');
  const items = document.querySelectorAll('.carusel-item');

  let index = 0;

  function updateSlide() {
    const itemWidth = items[0].getBoundingClientRect().width + 20; // ширина + відступ
    track.style.transform = `translateX(-${index * itemWidth}px)`;
  }

  nextBtn.addEventListener('click', () => {
    if (index < items.length - 1) {
      index++;
      updateSlide();
    }
  });

  prevBtn.addEventListener('click', () => {
    if (index > 0) {
      index--;
      updateSlide();
    }
  });


  window.addEventListener('resize', updateSlide);
});

function addToCart(name, price) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart(cart);
    }

    function removeFromCart(index) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart(cart);
    }

    function updateCart(cart = JSON.parse(localStorage.getItem('cart')) || []) {
      const cartContainer = document.getElementById('cart-items');
      const totalEl = document.getElementById('total');
      const countEl = document.getElementById('cart-count');

      cartContainer.innerHTML = '';
      let total = 0;

      cart.forEach((item, index) => {
        total += item.price;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <span>${item.name}</span>
          <span>${item.price} грн <button onclick="removeFromCart(${index})">x</button></span>
        `;
        cartContainer.appendChild(div);
      });

      totalEl.textContent = total;
      countEl.textContent = cart.length;
    }

    function toggleCart() {
      const cartEl = document.getElementById('cart');
      cartEl.style.display = cartEl.style.display === 'block' ? 'none' : 'block';
    }

    window.addEventListener('DOMContentLoaded', () => {
      updateCart();
    });
