const getTotalPrice = require('../cart/getTotalPrice');

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

function clearCart(products) {
    let clearCart = document.querySelector('.cart__clear');
    clearCart.addEventListener('click', function () {
        let items = document.querySelectorAll('.cart__item');
        items = [...items];
        for (let item of items) {
            item.remove();
        }
        localStorage.removeItem('cart');
        getTotalPrice();
        clearCart.style = 'display: none';
    });
    if (isEmpty(products)) {
        clearCart.style = 'display: none';
    }
}

module.exports = clearCart;