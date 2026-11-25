
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');

    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartContainer.innerHTML = cart.map((product) => {
        return `
            <div class="cart-item">
                <img src="${product.image}" alt="${product.title}">

                <div class="cart-details">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>

                    <button data-action="decrease" data-id="${product.id}">-</button>
                    <span>${product.quantity}</span>
                    <button data-action="increase" data-id="${product.id}">+</button>

                    <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>

                    <button data-action="remove" data-id="${product.id}">
                        Remove
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // -------- TOTAL AMOUNT --------

    const totalAmount = cart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    cartContainer.innerHTML += `
        <div class="cart-summary">
            <h2>Order Summary</h2>
            <h3>Total Amount: $${totalAmount.toFixed(2)}</h3>
           <button id="checkout-btn" data-action="checkout">Proceed to Checkout</button>
        </div>
    `;
}



// -------- CART BUTTONS --------

document.getElementById('cart-container').addEventListener('click', (event) => {

    const button = event.target.closest('button[data-action]');

    if (!button) return;

    const action = button.dataset.action;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // -------- CHECKOUT --------
    if (action === 'checkout') {

        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        window.location.href = 'checkout.html';
        return;
    }

    const productId = Number(button.dataset.id);

    const product = cart.find((item) => item.id === productId);

    if (!product) return;

    if (action === 'increase') {
        product.quantity++;
    }

    if (action === 'decrease') {
        if (product.quantity > 1) {
            product.quantity--;
        }
    }

    if (action === 'remove') {
        cart = cart.filter((item) => item.id !== productId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    displayCart();
});

displayCart();



