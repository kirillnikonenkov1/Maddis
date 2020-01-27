const deleteFromCart = require('../cart/deleteFromCart');
const getTotalPrice = require('../cart/getTotalPrice');
const clearCart = require('../cart/clearCart');
const list = document.querySelector('.cart__list');

function createDomElement(item) {
    let li = document.createElement('li');
    li.className = 'cart__item item';
    let content = document.createElement('div');
    content.className = 'item__content';
    let img = document.createElement('img');
    img.className = 'item__img';
    let descWrapper = document.createElement('div');
    descWrapper.className = 'item__descr-wrapper';
    let priceWrapper = document.createElement('div');
    priceWrapper.className = 'item__descr-wrapper';
    let title = document.createElement('p');
    title.className = 'item__title';
    let descr = document.createElement('p');
    descr.className = 'item__descr';
    let priceTotal  = document.createElement('p');
    priceTotal.className = 'item__price-total';
    let pricePerItem  = document.createElement('p');
    pricePerItem.className = 'item__price-total';
    let quantity = document.createElement('p');
    quantity.className = 'item__quantity';
    let buttonDelete = document.createElement('button');
    buttonDelete.className = 'item__delete';
    buttonDelete.setAttribute('data-id', item.data.id);
    buttonDelete.addEventListener('click', deleteFromCart);
    img.src = item.data.image;
    title.innerText = item.data.title;
    descr.innerText = item.data.descr;
    priceTotal.innerText = `${item.data.price * item.quantity} Р`;
    pricePerItem.innerText = `${item.data.price} Р`;
    quantity.innerText = `${item.quantity} шт.`;
    li.appendChild(img);
    content.appendChild(descWrapper);
    content.appendChild(priceWrapper);
    content.appendChild(priceTotal);
    descWrapper.appendChild(title);
    descWrapper.appendChild(descr);
    priceWrapper.appendChild(pricePerItem);
    priceWrapper.appendChild(quantity);
    li.appendChild(content);
    li.appendChild(buttonDelete);
    return li;
}

function renderCart(products) {
    for (let item in products) {
        let element = createDomElement(products[item]);
        list.appendChild(element);
    }
    getTotalPrice();
    clearCart(products);
}

module.exports = renderCart;
