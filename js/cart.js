const cartItems = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Savatchani render qilish
function renderCart() {
  cartItems.innerHTML = ""; // Savatchani tozalash
  let totalPrice = 0;

  if (cart.length > 0) {
    cart.forEach(product => {
      const itemTotalPrice = product.price * product.quantity; // Umumiy narx
      totalPrice += itemTotalPrice;

      let item = document.createElement("div");
      item.classList.add("cart-item");
      item.innerHTML = `
        <div class="flex justify-between items-center">
          <img src="${product.img}" alt="${product.title}" class="w-16 h-16">
          <h2>${product.title}</h2>
          <div class="flex items-center">
            <button class="minus-btn px-2 bg-gray-300" data-id="${product.id}">-</button>
            <span class="px-3">${product.quantity}</span>
            <button class="plus-btn px-2 bg-gray-300" data-id="${product.id}">+</button>
          </div>
          <h3>${itemTotalPrice.toLocaleString("uz-UZ")} so'm</h3>
          <button class="remove-btn bg-red-500 text-white px-4" data-id="${product.id}">O'chirish</button>
        </div>
      `;
      cartItems.appendChild(item);
    });

    totalPriceEl.textContent = totalPrice.toLocaleString("uz-UZ");
  } else {
    cartItems.innerHTML = `<p class="text-center text-red-500">Savatcha bo'sh!</p>`;
  }

  // Tugmalar uchun listener qo'shish
  document.querySelectorAll(".plus-btn").forEach(button => {
    button.addEventListener("click", () => updateQuantity(button.dataset.id, 1));
  });

  document.querySelectorAll(".minus-btn").forEach(button => {
    button.addEventListener("click", () => updateQuantity(button.dataset.id, -1));
  });

  document.querySelectorAll(".remove-btn").forEach(button => {
    button.addEventListener("click", () => removeFromCart(button.dataset.id));
  });
}

// Miqdorni yangilash
function updateQuantity(id, change) {
  cart = cart.map(product => {
    if (product.id === id) {
      product.quantity += change;
      if (product.quantity < 1) product.quantity = 1;
    }
    return product;
  });

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Savatchadan mahsulotni o'chirish
function removeFromCart(id) {
  cart = cart.filter(product => product.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Dastlabki render
renderCart();