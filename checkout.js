function displayCheckoutSummary() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const checkoutProducts = document.getElementById('checkout-products');

    if (cart.length === 0) {
        checkoutProducts.innerHTML = '<p>Your cart is empty!</p>';
        return;
    }

    checkoutProducts.innerHTML = cart.map((product) => {
        return `
            <div class="checkout-item">
                <img src="${product.image}" alt="${product.title}">

                <div class="checkout-item-details">
                    <h3>${product.title}</h3>
                    <p>Quantity: ${product.quantity}</p>
                    <p>Price: $${product.price}</p>
                    <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join('');

    const totalAmount = cart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    checkoutProducts.innerHTML += `
        <div class="checkout-total">
            <h3>Total Amount: $${totalAmount.toFixed(2)}</h3>
        </div>
    `;
}

displayCheckoutSummary();

document.getElementById('checkout-form').addEventListener('submit', (event) => {

    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('state').value.trim();
    const pincode = document.getElementById('pincode').value.trim();

    if (!/^\d{10}$/.test(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }

    if (!/^\d{6}$/.test(pincode)) {
        alert('Please enter a valid 6-digit pincode!');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const totalAmount = cart.reduce((total, product) => {
        return total + (product.price * product.quantity);
    }, 0);

    const order = {
        orderId: 'ELORA' + Date.now(),
        customer: {
            name,
            email,
            phone,
            address,
            city,
            state,
            pincode
        },
        products: cart,
        totalAmount: totalAmount,
        orderDate: new Date().toLocaleString(),
        status: 'Order Placed'
    };

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    orders.push(order);

    localStorage.setItem('orders', JSON.stringify(orders));

    localStorage.removeItem('cart');

    window.location.href = 'order-success.html';
});