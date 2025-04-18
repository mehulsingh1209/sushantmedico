// common.js - Shared JavaScript functionality

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuButton) {
      mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
    }
    
    // Initialize cart from localStorage
    initializeCart();
    
    // Add event listeners to add-to-cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        const productImage = this.getAttribute('data-image');
        
        addToCart(productId, productName, productPrice, productImage);
        updateCartCount();
        
        // Show confirmation
        showNotification('Added to cart: ' + productName);
      });
    });
  });
  
  // Cart functionality
  function initializeCart() {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    updateCartCount();
  }
  
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  
  function addToCart(id, name, price, image) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1
      });
    }
    
    saveCart(cart);
  }
  
  function removeFromCart(id) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== id);
    saveCart(updatedCart);
    updateCartCount();
    
    // If we're on the cart page, update the display
    if (window.location.pathname.includes('cart.html')) {
      displayCartItems();
    }
  }
  
  function updateCartQuantity(id, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === id);
    
    if (item) {
      item.quantity = parseInt(quantity);
      if (item.quantity <= 0) {
        removeFromCart(id);
      } else {
        saveCart(cart);
        
        // If we're on the cart page, update the display
        if (window.location.pathname.includes('cart.html')) {
          displayCartItems();
        }
      }
    }
    
    updateCartCount();
  }
  
  function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      const cart = getCart();
      const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
      cartCountElement.textContent = itemCount;
    }
  }
  
  function calculateCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // Notification system
  function showNotification(message) {
    // Check if notification container exists, if not, create it
    let notificationContainer = document.getElementById('notification-container');
    
    if (!notificationContainer) {
      notificationContainer = document.createElement('div');
      notificationContainer.id = 'notification-container';
      notificationContainer.style.position = 'fixed';
      notificationContainer.style.bottom = '20px';
      notificationContainer.style.left = '20px';
      notificationContainer.style.zIndex = '1000';
      document.body.appendChild(notificationContainer);
    }
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = 'var(--primary-color)';
    notification.style.color = 'white';
    notification.style.padding = '10px 20px';
    notification.style.borderRadius = 'var(--border-radius)';
    notification.style.marginTop = '10px';
    notification.style.boxShadow = 'var(--shadow)';
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transition = 'opacity 0.5s';
      
      setTimeout(() => {
        notificationContainer.removeChild(notification);
      }, 500);
    }, 3000);
  }
  
  // Product data - In a real application, this would come from a database
  const products = [
    {
      id: 'med001',
      name: 'Paracetamol 500mg',
      category: 'fever',
      price: 50,
      description: 'For fever and pain relief. Take as directed by your physician.',
      image: 'images/products/paracetamol.jpg',
      stock: 100
    },
    {
      id: 'med002',
      name: 'Cetirizine 10mg',
      category: 'allergy',
      price: 80,
      description: 'Antihistamine that reduces the effects of natural chemical histamine in the body.',
      image: 'images/products/cetirizine.jpg',
      stock: 75
    },
    {
      id: 'med003',
      name: 'Vitamin C 500mg',
      category: 'vitamins',
      price: 120,
      description: 'Supports immune function and overall health.',
      image: 'images/products/vitamin-c.jpg',
      stock: 150
    },
    {
      id: 'med004',
      name: 'Omeprazole 20mg',
      category: 'digestive',
      price: 95,
      description: 'Reduces the amount of acid in your stomach to treat heartburn and acid reflux.',
      image: 'images/products/omeprazole.jpg',
      stock: 60
    },
    {
      id: 'med005',
      name: 'Amoxicillin 500mg',
      category: 'antibiotic',
      price: 150,
      description: 'Antibiotic used to treat bacterial infections. Prescription required.',
      image: 'images/products/amoxicillin.jpg',
      stock: 40
    },
    {
      id: 'med006',
      name: 'Bandage Roll',
      category: 'first-aid',
      price: 70,
      description: 'Sterile bandage roll for wound dressing.',
      image: 'images/products/bandage.jpg',
      stock: 120
    }
  ];
  
  // Function to load products from our "database"
  function getProducts() {
    return products;
  }
  
  // Function to get a single product by ID
  function getProductById(id) {
    return products.find(product => product.id === id);
  }
  
  // Function to filter products by category
  function getProductsByCategory(category) {
    if (category === 'all') {
      return products;
    }
    return products.filter(product => product.category === category);
  }
  
  // Search functionality
  function searchProducts(query) {
    query = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query)
    );
  }