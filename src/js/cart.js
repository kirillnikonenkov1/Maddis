import './../sass/cart.scss';

const checkStorageCart = require('./localStorage/localStorageCart');
const renderCart = require('./render/render_cart');


let productsCart = checkStorageCart();
renderCart(productsCart);


