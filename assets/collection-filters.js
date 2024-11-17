document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filter-form');
    const productGrid = document.getElementById('products-grid');

    if (!filterForm || !productGrid) {
        console.error("Filter form or product grid not found in the DOM.");
        return;
    }

    const productCards = Array.from(productGrid.querySelectorAll('.product-card'));

    const filterProducts = () => {
        const availability = document.getElementById('availability').value;
        const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
        const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
        const sortBy = document.getElementById('sort-by').value;

        // Filter by Availability
        let filteredProducts = productCards.filter(product => {
            const isAvailable = product.dataset.available === 'true';
            if (availability === 'available') return isAvailable;
            if (availability === 'sold_out') return !isAvailable;
            return true;
        });

        // Filter by Price
        filteredProducts = filteredProducts.filter(product => {
            const price = parseFloat(product.dataset.price);
            return price >= minPrice && price <= maxPrice;
        });

        // Sort Products
        if (sortBy === 'title-asc') {
            filteredProducts.sort((a, b) => a.querySelector('h2').textContent.localeCompare(b.querySelector('h2').textContent));
        } else if (sortBy === 'title-desc') {
            filteredProducts.sort((a, b) => b.querySelector('h2').textContent.localeCompare(a.querySelector('h2').textContent));
        } else if (sortBy === 'price-asc') {
            filteredProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
        } else if (sortBy === 'price-desc') {
            filteredProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
        }

        // Clear and Render Filtered Products
        productGrid.innerHTML = '';
        filteredProducts.forEach(product => productGrid.appendChild(product));
    };

    filterForm.addEventListener('submit', (event) => {
        event.preventDefault();
        filterProducts();
    });
});
