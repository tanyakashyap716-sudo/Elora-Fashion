
function displayWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    const wishlistContainer = document.getElementById('wishlist-container');

    if (wishlist.length === 0) {
        wishlistContainer.innerHTML = '<p>Your wishlist is empty.</p>';
        return;
    }

    wishlistContainer.innerHTML = wishlist.map((product) => {
        return `
            <div class="wishlist-item">
                <img src="${product.image}" alt="${product.title}">

                <div class="wishlist-details">
                    <h3>${product.title}</h3>
                    <p>Price: $${product.price}</p>

                    <button data-action="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    <button data-action="remove" data-id="${product.id}">
                        Remove from Wishlist
                    </button>
                </div>
            </div>
        `;
    }).join('');
}


// -------- REMOVE FROM WISHLIST --------


document.getElementById('wishlist-container').addEventListener('click', (event) => {

    const button = event.target.closest('button[data-action]');

    if (!button) return;

    const action = button.dataset.action;
    const productId = Number(button.dataset.id);
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // -------- REMOVE FROM WISHLIST --------

    if (action === 'remove') {
        wishlist = wishlist.filter((item) => item.id !== productId);

        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        displayWishlist();
        return;
    }

    // -------- ADD TO CART --------

    if (action === 'add-to-cart') {

        const product = wishlist.find((item) => item.id === productId);

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProduct = cart.find((item) => item.id === productId);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        alert('Product added to cart successfully!');
    }
});

displayWishlist();

