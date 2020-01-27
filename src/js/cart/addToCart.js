const itemsDb = require('../products/items_db');
let items = itemsDb(3000);

function addToCart(e) {
    let id = this.getAttribute('data-id');
    let storage = JSON.parse(localStorage.getItem('cart'));
    let newStorage = {};
    if (storage === null) {
        newStorage[id] = {
            data: items[id],
            quantity: 1
        };
    } else if (!storage.hasOwnProperty(id)) {
        newStorage = {...storage};
        newStorage[id] = {
            data: items[id],
            quantity: 1
        };
    } else {
        newStorage = {...storage};
        newStorage[id].quantity++;
    }
    localStorage.setItem('cart', JSON.stringify(newStorage));
    e.target.nextElementSibling.innerText = `${JSON.parse(localStorage.getItem('cart'))[id].quantity} в корзине`;
}

module.exports = addToCart;