const randomIntenger = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
};

const randomAvailability = () => {
  let rand = Math.random();
  return (rand > 0.5);
};

function randomWords() {
    let text = '';
    let letters = 'абвгдежзийклмнопрстуфхцчшщъыьэюя';
    for (let item = 0; item <= 5; item++) {
        text += letters.charAt(randomIntenger(0, 32));
    }
    return text
}

function Item(id) {
    this.id = id;
    this.title = `${randomWords()}`;
    this.image = 'https://d37kg2ecsrm74.cloudfront.net/web/ikea4/images/382/0238233_PE377690_S5.jpg';
    this.descr = 'Супер стул';
    this.price = randomIntenger(1, 1000);
    this.available = randomAvailability();
}

module.exports = Item;
