"use strict";

/* IMPORTANT:
   Replace this with the seller's WhatsApp number.
   Nigerian example format: 2348012345678
   Do not include +, spaces or dashes.
*/
const WHATSAPP_NUMBER = "2348012345678";

const products = [
    {
        id: "p1",
        name: "Everyday Denim",
        price: 28500,
        tag: "NEW ARRIVAL",
        description: "Washed denim · Relaxed fit",
        image: "men.jpeg"
    },
    {
        id: "p2",
        name: "City Chic",
        price: 39500,
        tag: "POPULAR",
        description: "Modern styling · Easy fit",
        image: "woman.jpeg"
    },
    {
        id: "p3",
        name: "Classic Tee",
        price: 14500,
        tag: "ESSENTIAL",
        description: "Everyday essential · Comfortable",
        image: "men1.jpeg"
    },
    {
        id: "p4",
        name: "Statement Dress",
        price: 32000,
        tag: "NEW ARRIVAL",
        description: "Elegant style · Versatile",
        image: "Teeshirt.jpeg"
    },
    {
        id: "p5",
        name: "Smart Casual",
        price: 22000,
        tag: "JUST IN",
        description: "Easy layering · Modern look",
        image: "woman1.jpeg"
    },
    {
        id: "p6",
        name: "Everyday Dress",
        price: 28500,
        tag: "FAVOURITE",
        description: "Simple silhouette · Day to night",
        image: "woman2.jpeg"
    },
    {
        id: "p7",
        name: "Weekend Denim",
        price: 26000,
        tag: "JUST IN",
        description: "Relaxed fit · Easy styling",
        image: "Teeshirt1.jpeg"
    },
    {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman3.jpeg"
    },

// added
        {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "men2.jpeg"
    },
        {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman4.jpeg"
    },
        {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "men3.jpeg"
    },
        {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman5.jpeg"
    },
        {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "men4.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman6.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "men5.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman7.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman8.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "Teeshirt2.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "Teeshirt3.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman9.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman10.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman11.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman1.jpeg"
    },
     {
        id: "p8",
        name: "Classic Jacket",
        price: 42000,
        tag: "FEATURED",
        description: "Statement layer · Timeless",
        image: "woman.jpeg"
    },
// added
];

const cart = new Map();
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const formatMoney = amount =>
    "₦" + Number(amount).toLocaleString("en-NG");

let toastTimer;
let slideIndex = 0;
let slideTimer;

/* Create product cards */
function renderProducts() {
    $("#productGrid").innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-photo">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
        <button class="add-button" data-add="${product.id}">
          <i class="fa-solid fa-plus"></i> Add to cart
        </button>
      </div>
      <div class="product-info">
        <div class="product-line">
          <h3>${product.name}</h3>
          <strong>${formatMoney(product.price)}</strong>
        </div>
        <p>${product.description}</p>
      </div>
    </article>
  `).join("");
}

renderProducts();

/* Add products */
document.addEventListener("click", event => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
});

function addToCart(id) {
    const product = products.find(item => item.id === id);
    if (!product) return;

    if (cart.has(id)) {
        cart.get(id).quantity++;
    } else {
        cart.set(id, { ...product, quantity: 1 });
    }

    renderCart();
    showToast(product.name + " added to cart");
}

/* Cart display and totals */
function renderCart() {
    const items = [...cart.values()];
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    $("#cartCount").textContent = count;
    $("#drawerCount").textContent = `(${count})`;
    $("#subtotal").textContent = formatMoney(subtotal);
    $("#checkout").disabled = items.length === 0;

    if (!items.length) {
        $("#cartItems").innerHTML = `
      <div class="empty-cart">
        <i class="fa-solid fa-bag-shopping"></i>
        <h3>Your cart is empty</h3>
        <p>Add your favourite styles to get started.</p>
        <button class="btn dark-button" id="continueShopping">
          Continue shopping
        </button>
      </div>`;
        return;
    }

    $("#cartItems").innerHTML = items.map(item => `
    <article class="cart-item">
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h3>${item.name}</h3>
        <strong>${formatMoney(item.price * item.quantity)}</strong>
        <div class="item-actions">
          <button class="qty-button" data-qty="${item.id}" data-delta="-1"
            aria-label="Decrease quantity">−</button>
          <span>${item.quantity}</span>
          <button class="qty-button" data-qty="${item.id}" data-delta="1"
            aria-label="Increase quantity">+</button>
          <button class="remove-item" data-remove="${item.id}">Remove</button>
        </div>
      </div>
    </article>
  `).join("");
}

$("#cartItems").addEventListener("click", event => {
    const qtyButton = event.target.closest("[data-qty]");
    const removeButton = event.target.closest("[data-remove]");

    if (qtyButton) {
        const item = cart.get(qtyButton.dataset.qty);
        if (!item) return;

        item.quantity += Number(qtyButton.dataset.delta);
        if (item.quantity <= 0) cart.delete(item.id);

        renderCart();
    }

    if (removeButton) {
        cart.delete(removeButton.dataset.remove);
        renderCart();
    }

    if (event.target.closest("#continueShopping")) {
        closeCart();
        $("#shop").scrollIntoView({ behavior: "smooth" });
    }
});

/* Open and close the cart drawer */
function openCart() {
    $("#cartDrawer").classList.add("open");
    $("#overlay").classList.add("open");
    $("#cartDrawer").setAttribute("aria-hidden", "false");
    document.body.classList.add("cart-open");
    $("#closeCart").focus();
}

function closeCart() {
    $("#cartDrawer").classList.remove("open");
    $("#overlay").classList.remove("open");
    $("#cartDrawer").setAttribute("aria-hidden", "true");
    document.body.classList.remove("cart-open");
}

$("#openCart").addEventListener("click", openCart);
$("#viewCart").addEventListener("click", openCart);
$("#closeCart").addEventListener("click", closeCart);
$("#overlay").addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCart();
});

$("#clearCart").addEventListener("click", () => {
    cart.clear();
    renderCart();
    showToast("Your cart has been cleared");
});

/* WhatsApp order integration */
function openWhatsApp(message) {
    const number = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!number || number === "2349037141652") {
        showToast("Set the seller's WhatsApp number in script.js first");
        return;
    }

    const url = `https://wa.me/23409037141652?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
}

$("#checkout").addEventListener("click", () => {
    const items = [...cart.values()];
    if (!items.length) return;

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity, 0
    );

    const orderLines = items.map(item =>
        `- ${item.name} x ${item.quantity}: ${formatMoney(item.price * item.quantity)}`
    ).join("\n");

    const message =
        `Hello BlessingSTORES!\n\n` +
        `I would like to enquire about this order:\n${orderLines}\n\n` +
        `Subtotal: ${formatMoney(subtotal)}\n\n` +
        `Please confirm availability, sizes, colours, delivery fees and payment details.\n` +
        `My delivery location is: `;

    openWhatsApp(message);
});

$("#contactWhatsApp").addEventListener("click", event => {
    event.preventDefault();
    openWhatsApp("Hello BlessingSTORES! I would like to enquire about your clothing collection.");
});

/* Six-image automatic slider */
const slides = $$(".slide");

slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show slide ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    $("#sliderDots").appendChild(dot);
});

function showSlide(nextIndex) {
    slides[slideIndex].classList.remove("active");
    $("#sliderDots").children[slideIndex].classList.remove("active");

    slideIndex = (nextIndex + slides.length) % slides.length;

    slides[slideIndex].classList.add("active");
    $("#sliderDots").children[slideIndex].classList.add("active");
    $("#slideNumber").textContent =
        `${String(slideIndex + 1).padStart(2, "0")} / 06`;

    resetSliderTimer();
}

function resetSliderTimer() {
    clearInterval(slideTimer);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        slideTimer = setInterval(() => showSlide(slideIndex + 1), 5000);
    }
}

$("#nextSlide").addEventListener("click", () => showSlide(slideIndex + 1));
$("#prevSlide").addEventListener("click", () => showSlide(slideIndex - 1));

showSlide(0);

/* Mobile navigation */
$("#menuToggle").addEventListener("click", () => {
    const nav = $("#nav");
    const isOpen = nav.classList.toggle("open");

    $("#menuToggle").setAttribute("aria-expanded", String(isOpen));
    $("#menuToggle").innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

$$(".header nav a").forEach(link => {
    link.addEventListener("click", () => {
        $("#nav").classList.remove("open");
        $("#menuToggle").setAttribute("aria-expanded", "false");
        $("#menuToggle").innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

/* Small notification */
function showToast(message) {
    $("#toast").textContent = message;
    $("#toast").classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        $("#toast").classList.remove("show");
    }, 2800);
}

/* Footer year and logo loader */
$("#year").textContent = new Date().getFullYear();
renderCart();

window.addEventListener("load", () => {
    setTimeout(() => $("#loader").classList.add("hide"), 1500);
});


