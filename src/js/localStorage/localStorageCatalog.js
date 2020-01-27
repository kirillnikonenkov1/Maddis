let products = localStorage.getItem('products');
let currentPage = localStorage.getItem('currentPage');

function getProducts(items) {
    if (products === null || !products.includes(currentPage.slice(2, -2)))  { //slice - чтобы искать содержимое currentPage без скобок в начале и конце строки
        let JSONItems = JSON.stringify(items);
        localStorage.setItem('products', JSONItems);
        localStorage.removeItem('cart');
        return items;
    } else {
        return JSON.parse(currentPage);
    }
}

module.exports = getProducts;