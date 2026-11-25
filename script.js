
let fashionProducts = [];
async function getProducts() {
    try {
        const response = await fetch('https://dummyjson.com/products?limit=0');
        const data = await response.json();
        fashionProducts = data.products.filter((product) => {
            return [
                "mens-shirts",
                "mens-shoes",
                "tops",
                "womens-dresses",
                "womens-shoes",
                "womens-bags",
                "womens-jewellery",
                "sunglasses",
                "mens-watches",
                "womens-watches",
                "beauty",
                "fragrances",
                "skin-care",
                "home-decoration",
                "mobile-accessories"
            ].includes(product.category);
        });
        filterProducts();
    } catch (error) {
        console.log("Error:", error);
    }
}

function filterProducts() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const result = fashionProducts.filter((product) => {
        const matchesSearch = product.title.toLowerCase().includes(search);
        const matchesCategory = category === "" || category === "all" || product.category === category;
        return matchesSearch && matchesCategory;
    });
    const productContainer = document.getElementById('product-container');
    if (result.length === 0) {
        productContainer.innerHTML = "<p>No products found!</p>";
        return;
    }
    productContainer.innerHTML = result.map((product) => {
        return `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            <img src="${product.thumbnail}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <p>${product.category}</p>
            <button>Add to Cart</button>
        </div>
    `;
    }).join('');
}
getProducts();
document.getElementById('search-input').addEventListener('input', filterProducts);
document.getElementById('category-filter').addEventListener('change', filterProducts);