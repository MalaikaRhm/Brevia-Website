// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('nav ul');

mobileMenuBtn.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Modal Functionality
const orderButtons = document.querySelectorAll('.order-btn');
const orderModal = document.getElementById('orderModal');
const closeOrderModal = document.querySelector('.close-modal');


orderButtons.forEach(btn => {
  btn.addEventListener("click", () => {

    const name = btn.dataset.name;
    const price = btn.dataset.price;

    document.getElementById("order-item").textContent = "Item: " + name;
    document.getElementById("order-price").textContent = "Price: Rs " + price;

     orderModal.style.display = "flex";
    document.body.style.overflow = "hidden";
    addToCart(name, parseInt(price));
renderCartItems();
  });
});

closeOrderModal.addEventListener("click", () => {
  orderModal.style.display = "none";
  document.body.style.overflow = "auto";
});

document.getElementById("confirmOrder").addEventListener("click", () => {
  alert("Order Confirmed!");
  orderModal.style.display = "none";
  document.body.style.overflow = "auto";
});


// Form Validation
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  
  if (name && email && message) {
    if (validateEmail(email)) {
      showNotification('Thank you for your message! We will get back to you soon.', 'success');
      contactForm.reset();
    } else {
      showNotification('Please enter a valid email address.', 'error');
    }
  } else {
    showNotification('Please fill in all fields.', 'error');
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Notification system
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 3000;
    transition: all 0.3s ease;
    max-width: 300px;
  `;
  
  if (type === 'success') {
    notification.style.backgroundColor = '#4CAF50';
  } else {
    notification.style.backgroundColor = '#F44336';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Live Search Filter
const searchInput = document.getElementById('menu-search');
const drinkCards = document.querySelectorAll('.drink-card');

searchInput.addEventListener('input', () => {
  const searchTerm = searchInput.value.toLowerCase();
  let hasResults = false;
  
  drinkCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = 'block';
      hasResults = true;
    } else {
      card.style.display = 'none';
    }
  });
});

// --------------------
// CART SYSTEM
// --------------------
let cart = [];


// Add item to cart
function addToCart(title, price) {
  const existing = cart.find(item => item.title === title);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ title, price, qty: 1 });
  }
  updateCartCount();
}

// Render Cart Items
function renderCartItems() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  cart.forEach((item, index) => {
    container.innerHTML += `
      <div class="cart-item">
        <div>
          <p class="cart-item-title">${item.title}</p>
          <p>Rs ${item.price}</p>
        </div>

        <div class="cart-item-controls">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
          <button onclick="removeItem(${index})">🗑️</button>
        </div>
      </div>
    `;
  });

  updateCartTotal();
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

// Increase Quantity
function increaseQty(i) {
  cart[i].qty++;
  renderCartItems();
}

// Decrease Quantity
function decreaseQty(i) {
  cart[i].qty--;
  if (cart[i].qty === 0) cart.splice(i, 1);
  renderCartItems();
}

// Remove Item
function removeItem(i) {
  cart.splice(i, 1);
  renderCartItems();
}

// Update Total Price
function updateCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  document.getElementById("cart-total-price").textContent = `Rs ${total}`;
}

// --------------------
// CART MODAL
// --------------------
const cartModal = document.getElementById("cartModal");
const closeCart = document.querySelector(".close-cart");

// Missing variable added
const viewCartBtn = document.getElementById("view-cart-btn");
const openCartIcon = document.getElementById("open-cart");
openCartIcon.addEventListener("click", () => {
  renderCartItems();
  cartModal.style.display = "flex";
});

// Open Cart Modal
viewCartBtn.addEventListener("click", showCart);
const cartIcon = document.querySelector('.cart-icon-container');

cartIcon.addEventListener("click", () => {
  showCart();
});

function showCart() {
  renderCartItems();  // Ensure latest items show
  cartModal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Close Cart Modal via X button
closeCart.addEventListener("click", () => {
  cartModal.style.display = "none";
  document.body.style.overflow = "auto";
});

// --------------------
// CLOSE MODALS WHEN CLICKING OUTSIDE
// --------------------
window.addEventListener("click", (e) => {
  if (e.target === orderModal) {
    orderModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
  if (e.target === cartModal) {
    cartModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach(slide => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

setInterval(showSlides, 3000);

//back to top//
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
