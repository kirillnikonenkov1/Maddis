function getProducts() {
    if (localStorage.getItem('cart') !== null) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return [];
    }
}

module.exports = getProducts;