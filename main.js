import { products } from './src/products.js';
import { addToCart, checkout } from './src/cart.js';

// Make functions available globally
window.addToCart = (productId) => {
  const product = products.find(p => p.id === productId);
  addToCart(product);
};
window.checkout = checkout;
window.showProductDetails = showProductDetails;
window.goBack = goBack;

function displayProducts() {
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = products.map(product => `
    <div class="product-card" onclick="showProductDetails(${product.id})">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        <p class="product-price">$${product.price}</p>
        <button onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
      </div>
    </div>
  `).join('');
}

function showProductDetails(productId) {
  const product = products.find(p => p.id === productId);
  const main = document.querySelector('main');
  
  main.innerHTML = `
    <div class="product-details">
      <button class="back-button" onclick="goBack()">← Back to Products</button>
      <div class="product-details-content">
        <div class="product-details-image">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-details-info">
          <h2>${product.name}</h2>
          <p class="price">$${product.price}</p>
          <p class="description">${product.description}</p>
          <div class="specifications">
            <h3>Specifications</h3>
            <ul>
              ${Object.entries(product.specs).map(([key, value]) => `
                <li>
                  <strong>${key}:</strong> 
                  ${Array.isArray(value) ? value.join(', ') : value}
                </li>
              `).join('')}
            </ul>
          </div>
          <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function goBack() {
  const main = document.querySelector('main');
  main.innerHTML = `
    <h1>Welcome to ShopEasy</h1>
    <div class="products" id="products"></div>
  `;
  displayProducts();
}

// Initialize cart modal functionality
document.getElementById('cartIcon').addEventListener('click', () => {
  document.getElementById('cartModal').classList.toggle('active');
});

// Initialize the page
displayProducts();