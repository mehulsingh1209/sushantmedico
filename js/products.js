// Import products data
const products = getAllProducts();

function displayProducts(filteredProducts) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="images/products/${product.id}.jpg" 
                 alt="${product.name}" 
                 onerror="this.src='images/products/default.jpg'"
                 class="product-image">
            <div class="product-details">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Rs. ${product.price}</p>
                <div class="product-actions">
                    <button class="btn" onclick="addToCart('${product.id}')">Add to Cart</button>
                    <button class="btn btn-accent" onclick="buyNow('${product.id}')">Buy Now</button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Update the category filter options
function updateCategoryOptions() {
    const categories = [...new Set(products.map(p => p.category))];
    const categoryFilter = document.getElementById('categoryFilter');
    
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase();
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCategoryOptions();
    displayProducts(products);
});

// Search and filter functionality
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;

    const filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        return matchesSearch && matchesCategory;
    });

    displayProducts(filtered);
}

searchInput.addEventListener('input', filterProducts);
categoryFilter.addEventListener('change', filterProducts);

// Cart functionality
function addToCart(productId) {
    // Implement cart functionality
    alert('Product added to cart!');
}

function buyNow(productId) {
    // Implement buy now functionality
    window.location.href = 'checkout.html';
}