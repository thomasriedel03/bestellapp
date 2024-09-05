let subtotalValue = 0;
let basket = [];
let shipping = true;
let shippingCostValue = 0;
let basketItemCounter = 0;

function setArray(key, array) {
      localStorage.setItem(key, JSON.stringify(array));
}

function getArray(key) {
      return JSON.parse(localStorage.getItem(key));
}

function doNotClose(event) {
      event.stopPropagation();
}
