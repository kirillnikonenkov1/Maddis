function getTotalPrice () {
    let totalPriceEl = document.querySelector('.cart__total-price');
    let totalPrice = 0;
    let storage = JSON.parse(localStorage.getItem('cart'));
    for (let item in storage) {
        totalPrice += storage[item].data.price * storage[item].quantity;
    }
    if (totalPrice === 0) {
        totalPriceEl.innerHTML = `Корзина пуста`;
    } else {
        totalPriceEl.innerHTML = `Итоговая цена: ${totalPrice} P`;
    }
}

module.exports = getTotalPrice;