async function getProductDetails() {
    try {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        if (!productId) {
            throw new Error("Product ID not found!");
        }
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
            throw new Error("Product not found!");
        }
        const product = await response.json();
        document.getElementById('product-brand').textContent = product.brand || "ÉLORA";

        document.getElementById('product-rating').textContent = product.rating;

        document.getElementById('product-reviews').textContent =
            `(${product.reviews?.length || 0} reviews)`;

        document.getElementById('old-price').textContent =
            `$${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}`;

        document.getElementById('discount').textContent =
            `${Math.round(product.discountPercentage)}% OFF`;

        document.getElementById('breadcrumb-title').textContent = product.title;
        document.getElementById('product-title').textContent = product.title;
        document.getElementById('breadcrumb-category').textContent = product.category;
        document.getElementById('product-price').textContent = `$${product.price}`;
        document.getElementById('product-description').textContent = product.description;

        const mainImage = document.getElementById('main-image');
        const productImages = product.images?.length
            ? product.images
            : [product.thumbnail];

        mainImage.src = productImages[0];
        mainImage.alt = product.title;

        const thumbnailContainer = document.getElementById('thumbnail-container');
        thumbnailContainer.innerHTML = productImages.map((image) => {
            return `
        <img src="${image}" alt="${product.title}">
        `;
        }).join('');

        const thumbnails = thumbnailContainer.querySelectorAll('img');
        thumbnails.forEach((thumbnail) => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
            });
        });


        // -------- ADD TO WISHLIST --------

        const wishlistBtn = document.getElementById('wishlist-btn');

        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        const isAlreadyAdded = wishlist.find((item) => item.id === product.id);

        if (isAlreadyAdded) {
            wishlistBtn.textContent = '♥ ADDED TO WISHLIST';
        }

        wishlistBtn.addEventListener('click', () => {

            let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

            const existingProduct = wishlist.find((item) => item.id === product.id);

            if (existingProduct) {
                wishlist = wishlist.filter((item) => item.id !== product.id);

                wishlistBtn.textContent = '🖤 ADD TO WISHLIST';

                alert('Product removed from wishlist!');
            } else {
                wishlist.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.thumbnail
                });

                wishlistBtn.textContent = '❤️ ADDED TO WISHLIST';

                alert('Product added to wishlist!');
            }

            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        });

        // -------- ADD TO CART --------

        document.getElementById('add-to-cart').addEventListener('click', () => {

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProduct = cart.find((item) => item.id === product.id);

            if (existingProduct) {
                existingProduct.quantity += quantity;
            } else {
                cart.push({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.thumbnail,
                    quantity: quantity
                });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();

            alert('Product added to cart successfully!');
        });

    } catch (error) {
        console.log("Error:", error);
        document.getElementById('product-title').textContent = "Product not found!";
    }
}

getProductDetails();

let quantity = 1;

const quantityDisplay = document.getElementById('quantity');

document.getElementById('increase-btn').addEventListener('click', () => {
    quantity++;
    quantityDisplay.textContent = quantity;
});

document.getElementById('decrease-btn').addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityDisplay.textContent = quantity;
    }
});

