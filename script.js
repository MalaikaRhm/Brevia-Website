// brèvia Coffee Shop - Complete JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('brèvia Coffee Shop - JavaScript loaded!');
  
  // Global variables
  let cart = [];
  let currentPaymentMethod = null;
  
  // DOM Elements
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('.navbar nav');
  const shopNowBtn = document.getElementById('shop-now-btn');
  const menuSearch = document.getElementById('menu-search');
  const orderButtons = document.querySelectorAll('.order-btn');
  const cartModal = document.getElementById('cart-modal');
  const orderConfirmationModal = document.getElementById('order-confirmation-modal');
  const closeModalButtons = document.querySelectorAll('.close-modal');
  const viewCartBtn = document.getElementById('view-cart-btn');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const cartTax = document.getElementById('cart-tax');
  const cartTotal = document.getElementById('cart-total');
  const paymentOptions = document.querySelectorAll('.payment-option');
  const cardDetails = document.getElementById('card-details');
  const placeOrderBtn = document.getElementById('place-order-btn');
  const contactForm = document.getElementById('contact-form');
  const newsletterBtn = document.getElementById('newsletter-btn');

  // ==================== MOBILE MENU ====================
  function initMobileMenu() {
      if (mobileMenuBtn && nav) {
          console.log('Mobile menu initialized');
          
          mobileMenuBtn.addEventListener('click', function(e) {
              e.stopPropagation();
              nav.classList.toggle('active');
              
              // Toggle icon between bars and times
              const icon = this.querySelector('i');
              if (nav.classList.contains('active')) {
                  icon.classList.remove('fa-bars');
                  icon.classList.add('fa-times');
              } else {
                  icon.classList.remove('fa-times');
                  icon.classList.add('fa-bars');
              }
          });

          // Close mobile menu when clicking on links
          const navLinks = document.querySelectorAll('.navbar nav a');
          navLinks.forEach(link => {
              link.addEventListener('click', function() {
                  if (window.innerWidth <= 768 && nav) {
                      nav.classList.remove('active');
                      const icon = mobileMenuBtn.querySelector('i');
                      if (icon) {
                          icon.classList.remove('fa-times');
                          icon.classList.add('fa-bars');
                      }
                  }
              });
          });

          // Close mobile menu when clicking outside
          document.addEventListener('click', function(e) {
              if (nav.classList.contains('active') && 
                  !nav.contains(e.target) && 
                  !mobileMenuBtn.contains(e.target)) {
                  nav.classList.remove('active');
                  const icon = mobileMenuBtn.querySelector('i');
                  if (icon) {
                      icon.classList.remove('fa-times');
                      icon.classList.add('fa-bars');
                  }
              }
          });
      }
  }

  // ==================== SMOOTH SCROLLING ====================
  function initSmoothScroll() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
          anchor.addEventListener('click', function (e) {
              const href = this.getAttribute('href');
              if (href === '#') return;
              
              e.preventDefault();
              const target = document.querySelector(href);
              if (target) {
                  // Close mobile menu if open
                  if (nav && nav.classList.contains('active')) {
                      nav.classList.remove('active');
                      const icon = mobileMenuBtn.querySelector('i');
                      if (icon) {
                          icon.classList.remove('fa-times');
                          icon.classList.add('fa-bars');
                      }
                  }
                  
                  target.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                  });
              }
          });
      });
  }

  // ==================== EXPLORE MENU BUTTON ====================
  function initExploreMenu() {
      if (shopNowBtn) {
          console.log('Explore menu button initialized');
          shopNowBtn.addEventListener('click', function() {
              document.getElementById('menu').scrollIntoView({ 
                  behavior: 'smooth' 
              });
          });
      }
  }

  // ==================== SEARCH FUNCTIONALITY ====================
  function initSearch() {
      if (menuSearch) {
          console.log('Search functionality initialized');
          menuSearch.addEventListener('input', function() {
              const searchTerm = this.value.toLowerCase().trim();
              const drinkCards = document.querySelectorAll('.drink-card');
              const categorySections = document.querySelectorAll('.category-section');
              
              let hasVisibleItems = false;
              
              // If search is empty, show all items and sections
              if (searchTerm === '') {
                  drinkCards.forEach(card => {
                      card.style.display = 'block';
                  });
                  categorySections.forEach(section => {
                      section.style.display = 'block';
                  });
                  return;
              }
              
              // Filter items and hide/show sections accordingly
              categorySections.forEach(section => {
                  const sectionCards = section.querySelectorAll('.drink-card');
                  let sectionHasVisibleItems = false;
                  
                  sectionCards.forEach(card => {
                      const itemName = card.querySelector('h3').textContent.toLowerCase();
                      const itemDescription = card.querySelector('p').textContent.toLowerCase();
                      
                      if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                          card.style.display = 'block';
                          sectionHasVisibleItems = true;
                          hasVisibleItems = true;
                      } else {
                          card.style.display = 'none';
                      }
                  });
                  
                  // Show/hide entire section based on visible items
                  section.style.display = sectionHasVisibleItems ? 'block' : 'none';
              });
          });
      }
  }

  // ==================== ORDER FUNCTIONALITY ====================
  function initOrderSystem() {
      console.log('Order system initialized with', orderButtons.length, 'order buttons');
      
      // Order buttons
      orderButtons.forEach(button => {
          button.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              console.log('Order button clicked');
              const card = this.closest('.drink-card');
              const itemName = card.getAttribute('data-name');
              const itemPriceText = card.querySelector('.drink-card-price').textContent;
              const itemPrice = parseFloat(itemPriceText.replace('$', '').trim());
              const itemImage = card.querySelector('img').src;
              
              console.log('Adding to cart:', itemName, itemPrice);
              addToCart(itemName, itemPrice, itemImage);
              showOrderConfirmation();
          });
      });

      // Close modal buttons
      closeModalButtons.forEach(button => {
          button.addEventListener('click', function() {
              const modal = this.closest('.modal');
              closeModal(modal);
          });
      });

      // View cart button
      if (viewCartBtn) {
          viewCartBtn.addEventListener('click', function() {
              closeModal(orderConfirmationModal);
              showCart();
          });
      }

      // Payment options
      paymentOptions.forEach(option => {
          option.addEventListener('click', function() {
              // Remove selected class from all options
              paymentOptions.forEach(opt => opt.classList.remove('selected'));
              // Add selected class to clicked option
              this.classList.add('selected');
              
              // Get payment method
              currentPaymentMethod = this.getAttribute('data-method');
              
              // Show/hide card details
              if (currentPaymentMethod === 'card') {
                  cardDetails.classList.add('active');
              } else {
                  cardDetails.classList.remove('active');
              }
              
              // Update cart totals
              updateCartTotals();
          });
      });

      // Place order button
      if (placeOrderBtn) {
          placeOrderBtn.addEventListener('click', function() {
              if (cart.length === 0) {
                  alert('Your cart is empty!');
                  return;
              }
              
              if (!currentPaymentMethod) {
                  alert('Please select a payment method!');
                  return;
              }
              
              if (currentPaymentMethod === 'card') {
                  const cardNumber = document.getElementById('card-number').value;
                  const cardExpiry = document.getElementById('card-expiry').value;
                  const cardCVV = document.getElementById('card-cvv').value;
                  
                  if (!cardNumber || !cardExpiry || !cardCVV) {
                      alert('Please enter all card details!');
                      return;
                  }
              }
              
              // Order confirmation
              const orderDetails = cart.map(item => 
                  `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
              ).join('\n');
              
              const totalAmount = cartTotal.textContent;
              
              alert(`Order placed successfully!\n\nOrder Details:\n${orderDetails}\n\nTotal: ${totalAmount}\nPayment Method: ${currentPaymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit/Debit Card'}\n\nThank you for your purchase!`);
              
              // Reset cart and close modal
              cart = [];
              updateCartTotals();
              updateCartBadge();
              closeModal(cartModal);
              
              // Reset payment form
              if (currentPaymentMethod === 'card') {
                  document.getElementById('card-number').value = '';
                  document.getElementById('card-expiry').value = '';
                  document.getElementById('card-cvv').value = '';
              }
              currentPaymentMethod = null;
              paymentOptions.forEach(opt => opt.classList.remove('selected'));
              cardDetails.classList.remove('active');
          });
      }

      // Close modals when clicking outside
      window.addEventListener('click', function(event) {
          if (event.target.classList.contains('modal')) {
              closeModal(event.target);
          }
      });
  }

  // ==================== CART FUNCTIONS ====================
  function addToCart(name, price, image) {
      // Check if item already exists in cart
      const existingItem = cart.find(item => item.name === name);
      
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({
              name: name,
              price: price,
              image: image,
              quantity: 1
          });
      }
      
      updateCartTotals();
      updateCartBadge();
      console.log('Cart updated:', cart);
  }

  function showOrderConfirmation() {
      if (orderConfirmationModal) {
          orderConfirmationModal.classList.add('active');
          console.log('Order confirmation shown');
      }
  }

  function showCart() {
      renderCartItems();
      if (cartModal) {
          cartModal.classList.add('active');
          console.log('Cart shown');
      }
  }

  function renderCartItems() {
      if (!cartItemsContainer) return;
      
      cartItemsContainer.innerHTML = '';
      
      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 2rem; color: #777;">Your cart is empty</p>';
          return;
      }
      
      cart.forEach(item => {
          const cartItem = document.createElement('div');
          cartItem.className = 'cart-item';
          
          cartItem.innerHTML = `
              <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px;">
              <div class="cart-item-details" style="flex: 1; margin: 0 1rem;">
                  <div class="cart-item-name" style="font-weight: 600; margin-bottom: 0.25rem;">${item.name}</div>
                  <div class="cart-item-price" style="color: #777;">$${item.price.toFixed(2)} each</div>
              </div>
              <div class="cart-item-quantity" style="display: flex; align-items: center; gap: 0.5rem;">
                  <button class="quantity-btn decrease-btn" data-name="${item.name}" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">-</button>
                  <span style="min-width: 20px; text-align: center; font-weight: 600;">${item.quantity}</span>
                  <button class="quantity-btn increase-btn" data-name="${item.name}" style="background: #f0f0f0; border: none; width: 30px; height: 30px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center;">+</button>
              </div>
          `;
          
          cartItemsContainer.appendChild(cartItem);
      });
      
      // Add event listeners to quantity buttons
      document.querySelectorAll('.decrease-btn').forEach(button => {
          button.addEventListener('click', function() {
              const itemName = this.getAttribute('data-name');
              decreaseQuantity(itemName);
          });
      });
      
      document.querySelectorAll('.increase-btn').forEach(button => {
          button.addEventListener('click', function() {
              const itemName = this.getAttribute('data-name');
              increaseQuantity(itemName);
          });
      });
  }

  function decreaseQuantity(name) {
      const item = cart.find(item => item.name === name);
      
      if (item) {
          if (item.quantity > 1) {
              item.quantity -= 1;
          } else {
              // Remove item from cart if quantity becomes 0
              cart = cart.filter(item => item.name !== name);
          }
          
          renderCartItems();
          updateCartTotals();
          updateCartBadge();
      }
  }

  function increaseQuantity(name) {
      const item = cart.find(item => item.name === name);
      
      if (item) {
          item.quantity += 1;
          renderCartItems();
          updateCartTotals();
          updateCartBadge();
      }
  }

  function updateCartTotals() {
      if (!cartSubtotal || !cartTax || !cartTotal) return;
      
      let subtotal = 0;
      
      cart.forEach(item => {
          subtotal += item.price * item.quantity;
      });
      
      let taxRate = 0;
      if (currentPaymentMethod === 'cod') {
          taxRate = 0.15; // 15% GST for COD
      } else if (currentPaymentMethod === 'card') {
          taxRate = 0.05; // 5% GST for card
      }
      
      const tax = subtotal * taxRate;
      const total = subtotal + tax;
      
      cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
      cartTax.textContent = `$${tax.toFixed(2)}`;
      cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  function updateCartBadge() {
      // Add or update cart badge in navbar
      let cartBadge = document.querySelector('.cart-badge');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      
      if (totalItems > 0) {
          if (!cartBadge) {
              cartBadge = document.createElement('span');
              cartBadge.className = 'cart-badge';
              const logo = document.querySelector('.logo');
              if (logo) {
                  logo.appendChild(cartBadge);
              }
          }
          cartBadge.textContent = totalItems;
          cartBadge.classList.add('show');
      } else if (cartBadge) {
          cartBadge.classList.remove('show');
      }
  }

  function closeModal(modal) {
      if (modal) {
          modal.classList.remove('active');
      }
  }

  // ==================== FORM HANDLING ====================
  function initForms() {
      // Contact form
      if (contactForm) {
          contactForm.addEventListener('submit', function(e) {
              e.preventDefault();
              const name = document.getElementById('name').value;
              const email = document.getElementById('email').value;
              const message = document.getElementById('message').value;
              
              if (name && email && message) {
                  alert('Thank you for your message, ' + name + '! We will get back to you soon.');
                  this.reset();
              } else {
                  alert('Please fill in all fields.');
              }
          });
      }

      // Newsletter form
      if (newsletterBtn) {
          newsletterBtn.addEventListener('click', function() {
              const email = document.getElementById('newsletter-email').value;
              if (email && email.includes('@')) {
                  alert('Thank you for subscribing to our newsletter!');
                  document.getElementById('newsletter-email').value = '';
              } else {
                  alert('Please enter a valid email address.');
              }
          });
      }
  }

  // ==================== WINDOW RESIZE HANDLER ====================
  function handleResize() {
      // Close mobile menu when resizing to desktop
      if (window.innerWidth > 768 && nav) {
          nav.classList.remove('active');
          const icon = mobileMenuBtn.querySelector('i');
          if (icon) {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      }
  }

  // ==================== INITIALIZATION ====================
  function init() {
      console.log('Initializing brèvia Coffee Shop...');
      
      initMobileMenu();
      initSmoothScroll();
      initExploreMenu();
      initSearch();
      initOrderSystem();
      initForms();
      
      // Window resize handler
      window.addEventListener('resize', handleResize);
      
      // Initialize cart badge
      updateCartBadge();
      
      console.log('brèvia Coffee Shop - All systems ready!');
  }

  // Start the application
  init();
});
