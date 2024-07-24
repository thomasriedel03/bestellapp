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

function setMenuAndBasketArrays() {
      //setArray('menu', menu);
      //setArray('basket', basket);
}

function reestablishReferences() {
      // Reestablish references between basket items and menu items
      //      for (let i = 0; i < basket.length; i++) {
      //           let basketItem = basket[i];
      //         for (let sectionIndex = 0; sectionIndex < menu.length; sectionIndex++) {
      //             const section = menu[sectionIndex];
      //           for (let dishIndex = 0; dishIndex < section.dishes.length; dishIndex++) {
      //               let menuDish = section.dishes[dishIndex];
      //             if (menuDish.name === basketItem.name) {
      //                  basket[i] = menuDish;
      //           }
      //    }
      //      }
      // }
}
