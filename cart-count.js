
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const cartCount = document.getElementById('cart-count');

    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

updateCartCount();

// Update when another tab changes the cart
window.addEventListener('storage', updateCartCount);

// Update when user returns to this page
window.addEventListener('focus', updateCartCount);
