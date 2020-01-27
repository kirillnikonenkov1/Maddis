const productItem = require('./Product_item');

function createItems(numOfProducts) {
    let arrItems = [];

    for (let i = 0; i < numOfProducts; i++) {
        let item = new productItem(i);
        arrItems.push(item);
    }
    return arrItems;
}

module.exports = createItems;