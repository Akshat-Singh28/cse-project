let cart = [];

export function addToCart(product) {
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

export function updateCartUI() {
  const cartItems = document.getElementById('cartItems');
  const cartCount = document.getElementById('cartCount');
  const cartTotal = document.getElementById('cartTotal');

  cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

  cartItems.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div>
        ${item.name} x${item.quantity}
      </div>
      <div>
        $${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  `).join('');

  cartTotal.textContent = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
}

export function checkout() {
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  alert('Thank you for your purchase!');
  cart = [];
  updateCartUI();
  document.getElementById('cartModal').classList.remove('active');
}