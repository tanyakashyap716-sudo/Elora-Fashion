function displayOrderDetails() {

    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    const orderDetails = document.getElementById('order-details');

    if (orders.length === 0) {
        orderDetails.innerHTML = '<p>No order details found!</p>';
        return;
    }

    const latestOrder = orders[orders.length - 1];

    orderDetails.innerHTML = `
        <div class="order-info">
            <p><strong>Order ID:</strong> ${latestOrder.orderId}</p>
            <p><strong>Customer:</strong> ${latestOrder.customer.name}</p>
            <p><strong>Total Amount:</strong> $${latestOrder.totalAmount.toFixed(2)}</p>
            <p><strong>Order Date:</strong> ${latestOrder.orderDate}</p>
            <p><strong>Status:</strong> ${latestOrder.status}</p>
        </div>
    `;
}

displayOrderDetails();