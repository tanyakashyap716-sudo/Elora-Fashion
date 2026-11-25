
function displayOrders() {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const ordersContainer = document.getElementById('orders-container');

    if (orders.length === 0) {
        ordersContainer.innerHTML = '<p>You have not placed any orders yet.</p>';
        return;
    }

    // Newest orders first
    ordersContainer.innerHTML = `
        <button data-action="clear-all" class="clear-orders-btn">
            Clear All Orders
        </button>

        ${[...orders].reverse().map((order) => {
            return `
                <div class="order-card">
                    <h3>Order ID: ${order.orderId}</h3>

                    <p>Customer: ${order.customer.name}</p>
                    <p>Email: ${order.customer.email}</p>
                    <p>Phone: ${order.customer.phone}</p>

                    <p>Address: ${order.customer.address},
                    ${order.customer.city},
                    ${order.customer.state} - ${order.customer.pincode}</p>

                    <p>Order Date: ${order.orderDate}</p>
                    <p>Status: ${order.status}</p>

                    <h4>Ordered Products:</h4>

                    ${order.products.map((product) => {
                        return `
                            <div class="ordered-product">
                                <img src="${product.image}" alt="${product.title}">
                                <div>
                                    <h4>${product.title}</h4>
                                    <p>Price: $${product.price}</p>
                                    <p>Quantity: ${product.quantity}</p>
                                    <p>Subtotal: $${(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        `;
                    }).join('')}

                    <h3>Total Amount: $${order.totalAmount.toFixed(2)}</h3>

                    <button data-action="delete" data-id="${order.orderId}" class="delete-order-btn">
                        Delete Order
                    </button>
                </div>
            `;
        }).join('')}
    `;
}

// Custom Delete Confirmation Popup

const deleteModal = document.getElementById('delete-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');

const cancelDelete = document.getElementById('cancel-delete');
const confirmDelete = document.getElementById('confirm-delete');

let pendingAction = null;
let selectedOrderId = null;

// Open popup
function openDeleteModal(action, orderId = null) {
    pendingAction = action;
    selectedOrderId = orderId;

    if (action === 'delete') {
        modalTitle.textContent = 'Delete Order?';
        modalMessage.textContent =
            'Are you sure you want to delete this order? This action cannot be undone!';
    } else {
        modalTitle.textContent = 'Clear All Orders?';
        modalMessage.textContent =
            'Are you sure you want to delete your entire order history? This action cannot be undone!';
    }

    deleteModal.classList.add('active');
}

// Close popup
function closeDeleteModal() {
    deleteModal.classList.remove('active');
    pendingAction = null;
    selectedOrderId = null;
}

// Handle order buttons
document.getElementById('orders-container').addEventListener('click', (event) => {

    const button = event.target.closest('button[data-action]');

    if (!button) return;

    const action = button.dataset.action;

    if (action === 'delete') {
        openDeleteModal('delete', button.dataset.id);
    }

    if (action === 'clear-all') {
        openDeleteModal('clear-all');
    }
});

// Cancel button
cancelDelete.addEventListener('click', closeDeleteModal);

// Confirm button
confirmDelete.addEventListener('click', () => {

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (pendingAction === 'delete') {

        orders = orders.filter((order) => {
            return order.orderId !== selectedOrderId;
        });

        localStorage.setItem('orders', JSON.stringify(orders));

    } else if (pendingAction === 'clear-all') {

        localStorage.removeItem('orders');
    }

    closeDeleteModal();
    displayOrders();
});

// Click outside popup to close
deleteModal.addEventListener('click', (event) => {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

// Escape key to close
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeDeleteModal();
    }
});

displayOrders();
