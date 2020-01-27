import './../sass/index.scss';

const itemsDb = require('./products/items_db');
const checkStorageCatalog = require('./localStorage/localStorageCatalog');
const renderCatalog = require('./render/render_catalog');
const numberOfProducts = 3000;

let productsCatalog = checkStorageCatalog(itemsDb(numberOfProducts));
try {
    renderCatalog(productsCatalog);
} catch {
    renderCatalog(JSON.parse(localStorage.getItem('products')));
}







