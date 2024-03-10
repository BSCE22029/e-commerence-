// Get the products, shopping cart, and checkout form elements
const products = document.getElementById('products');
const cart = document.getElementById('cart');
const checkoutForm = document.getElementById('checkout-form');

// Initialize the shopping cart as an empty array
let cartItems = [];

// Add an event listener to each product's "Add to Cart" button
products.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON' && e.target.dataset.productId) {
    const productId = e.target.dataset.productId;
    const product = findProductById(productId);

    if (product) {
      addToCart(product);
    }
  }
});

// Add an event listener to the shopping cart's "Checkout" button
cart.querySelector('button').addEventListener('click', () => {
  checkoutForm.hidden = false;
  cart.hidden = true;
});

// Helper function to find a product by its ID
function findProductById(id) {
  return Array.from(products.children).find(product => product.dataset.productId == id);
}

// Helper function to add a product to the shopping cart
function addToCart(product) {
  const existingItemIndex = cartItems.findIndex(item => item.id === product.dataset.productId);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({
      id: product.dataset.productId,
      name: product.querySelector('h2').innerText,
      price: parseFloat(product.querySelector('p').innerText.replace('$', '')),
      quantity: 1
    });
  }

  updateCart();
}

// Helper function to update the shopping cart display
function updateCart() {
  cart.innerHTML = '';
  let total = 0;

  cartItems.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.classList.add('cart-item');
    itemElement.innerHTML = `
      <h2>${item.name}</h2>
      <p>Quantity: ${item.quantity}</p>
      <p>Price: $${item.price}</p>
      <button data-item-id="${item.id}">Remove from Cart</button>
    `;
    cart.appendChild(itemElement);

    total += item.price * item.quantity;
  });

  const totalElement = document.createElement('div');
  totalElement.classList.add('total');
  totalElement.innerText = `Total: $${total.toFixed(2)}`;
  cart.appendChild(totalElement);

  // Add an event listener to each item's "Remove from Cart" button
  cart.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && e.target.dataset.itemId) {
      const itemId = e.target.dataset.itemId;
      cartItems = cartItems.filter(item => item.id !== itemId);
      updateCart();
    }
  });
}

// Helper function to initialize the products display
function initializeProducts() {
  const product1 = document.createElement('div');
  product1.classList.add('product');
  product1.dataset.productId = '1';
  product1.innerHTML = `
    <img src="product1.jpg" alt="Product 1">
    <h2>Product 1</h2>
    <p>$99.99</p>
    <button data-product-id="1">Add to Cart</button>
  `;
  products.appendChild(product1);}