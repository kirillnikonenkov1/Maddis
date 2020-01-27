const addToCart = require('../cart/addToCart');
const itemsPerPage = 15;
const btnsPerPage = 8;
let buttonsRendered = false;

function defineElements(products, page) {
    let elementsOnPage = [];
    let currentPageItems = page * 15;
    for (let i = currentPageItems; i < currentPageItems + itemsPerPage; i++) {
        elementsOnPage.push(products[i]);
    }
    return elementsOnPage;
}

function renderBtn(item, className, products, numberOfBtns) {
    for (let i = item; i < item + numberOfBtns; i++) {
        let parent = document.querySelector('.catalog__nav-list');
        let btnElem = document.createElement('button');
        btnElem.className = className;
        btnElem.innerText = `${i}`;
        btnElem.addEventListener('click', function () {
            let elementsOnPage = defineElements(products, i - 1);
            buttonsRendered = false;
            renderCatalog(elementsOnPage);
            window.scrollTo(0, 0);
        });
        parent.appendChild(btnElem);
    }
}

function renderBtnsNav(itemsPerPage) {
    let products = JSON.parse(localStorage.getItem('products'));
    let numOfProducts = products.length;
    let numOfPages = Math.ceil(numOfProducts / itemsPerPage);
    let parent = document.querySelector('.catalog__nav-list');
    let currentPageItem = JSON.stringify(JSON.parse(localStorage.getItem('currentPage'))[0]);
    let currentPage = 0;
    for (let i = 0; i < numOfProducts; i++) {
        if (JSON.stringify(products[i]) === currentPageItem) {
            currentPage = i/15 + 1;
        }
    }
    while (parent.firstChild) {
        parent.firstChild.remove();
    }

    renderBtn(1, 'catalog__nav-btn catalog__nav-btn--first', products, 1);

    if (currentPage === 1) {
        renderBtn(currentPage + 1, 'catalog__nav-btn', products, btnsPerPage);
    } else if (currentPage === 2) {
        renderBtn(currentPage, 'catalog__nav-btn', products, btnsPerPage);
    } else if (currentPage === numOfPages) {
        renderBtn(numOfPages - btnsPerPage, 'catalog__nav-btn', products, btnsPerPage);
    } else if (currentPage > numOfPages - btnsPerPage && currentPage < numOfPages) {
        renderBtn(numOfPages - btnsPerPage, 'catalog__nav-btn', products, btnsPerPage);
    } else {
        renderBtn(currentPage - 1, 'catalog__nav-btn', products, btnsPerPage);
    }

    renderBtn(numOfPages, 'catalog__nav-btn catalog__nav-btn--last', products, 1);
    document.querySelectorAll('.catalog__nav-btn').forEach(element => {
        if (element.innerText === currentPage.toString()) {
            element.classList.add('catalog__nav-btn--active');
        }
    });
}

function createDomElement(item) {
    let li = document.createElement('li');
    li.className = 'catalog__item item';
    let img = document.createElement('img');
    img.className = 'item__img';
    let title = document.createElement('p');
    title.className = 'item__title';
    let descr = document.createElement('p');
    descr.className = 'item__descr';
    let price = document.createElement('p');
    price.className = 'item__price';
    let buttonBuy = document.createElement('button');
    buttonBuy.className = (item.available) ? 'item__btn-buy item__btn-buy--available' : "item__btn-buy item__btn-buy--unavailable";
    buttonBuy.innerText = (item.available) ? 'В корзину' : 'Нет в наличии';
    buttonBuy.setAttribute('data-id', item.id);
    if (item.available) {
        buttonBuy.addEventListener('click', addToCart);
    } else {
        buttonBuy.addEventListener('click', function () {
            alert('Товар скоро появится в продаже');
        });
    }
    let quantity = document.createElement('p');
    quantity.className = 'item__quantity';
    img.src = item.image;
    title.innerText = item.title;
    descr.innerText = item.descr;
    price.innerText = `${item.price} Р`;
    quantity.innerText = (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'))[item.id] !== undefined)  ? `${JSON.parse(localStorage.getItem('cart'))[item.id].quantity} в корзине` : '';
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(descr);
    li.appendChild(price);
    li.appendChild(buttonBuy);
    li.appendChild(quantity);
    return li;
}

function filterPriceUp() {
    let button = document.querySelector('.catalog__sort-btn--price-up');
    let products = JSON.parse(localStorage.getItem('products'));
    button.addEventListener('click', function () {
        products.sort(function (a, b) {
            return a.price - b.price;
        });
        localStorage.setItem('products', JSON.stringify(products));
        buttonsRendered = false;
        renderCatalog(products);
    })
}

function filterPriceDown() {
    let button = document.querySelector('.catalog__sort-btn--price-down');
    let products = JSON.parse(localStorage.getItem('products'));
    button.addEventListener('click', function () {
        products.sort(function (a, b) {
            return b.price - a.price;
        });
        localStorage.setItem('products', JSON.stringify(products));
        buttonsRendered = false;
        renderCatalog(products);
    })
}

function filterPriceName() {
    let button = document.querySelector('.catalog__sort-btn--name');
    let products = JSON.parse(localStorage.getItem('products'));
    button.addEventListener('click', function () {
        products.sort(function (a, b) {
            let nameA=a.title.toLowerCase(), nameB=b.title.toLowerCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1
            }
            return 0
        });
        localStorage.setItem('products', JSON.stringify(products));
        buttonsRendered = false;
        renderCatalog(products);
    })
}

function filterAvailability() {
    let button = document.querySelector('.catalog__sort-btn--availability');
    let products = JSON.parse(localStorage.getItem('products'));
    button.addEventListener('click', function () {
        products.sort(function (a, b) {
           if (a.available > b.available) {
               return -1;
           }
        });
        localStorage.setItem('products', JSON.stringify(products));
        buttonsRendered = false;
        renderCatalog(products);
    })
}

function renderCatalog(products) {
    let list = document.querySelector('.catalog__list');
    while (list.firstChild) {
        list.firstChild.remove();
    }
    let elementsOnPage = defineElements(products, 0);
    let JSONElement = JSON.stringify(elementsOnPage);
    localStorage.setItem('currentPage', JSONElement);
    for (let item of elementsOnPage) {
        let element = createDomElement(item);
        list.appendChild(element);
    }
    if (!buttonsRendered) {
        renderBtnsNav(itemsPerPage);
    }
    filterPriceUp();
    filterPriceDown();
    filterPriceName();
    filterAvailability();
    buttonsRendered = true;
}

module.exports = renderCatalog;