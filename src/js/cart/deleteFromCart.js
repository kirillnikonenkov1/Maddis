const getTotalPrice = require('../cart/getTotalPrice');

function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}

function deleteFromCart(e) {
    let id = this.getAttribute('data-id');
    let storage = JSON.parse(localStorage.getItem('cart'));
    delete storage[id];
    localStorage.setItem('cart', JSON.stringify(storage));
    getTotalPrice();
    let parentElem = e.target;
    while (parentElem.className !== 'cart__item item') {
        parentElem = parentElem.parentElement;
    }
    parentElem.remove();
    if (isEmpty(JSON.parse(localStorage.getItem('cart')))) {
        let clearCart = document.querySelector('.cart__clear');
        clearCart.style = 'display: none';
    }
}

module.exports = deleteFromCart;