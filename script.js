function render() {
      getSavedArrays();
      renderMenu();
      renderBasket();
}

function renderMenu() {
      document.getElementById('menu-section').innerHTML = '';

      for (let sectionIndex = 0; sectionIndex < menu.length; sectionIndex++) {
            const section = menu[sectionIndex];
            document.getElementById('menu-section').innerHTML += generateMenuSectionHTML(section, sectionIndex);
            const dishArea = document.getElementById(`${sectionIndex}-dish-area`);
            dishArea.innerHTML = '';
            for (let dishIndex = 0; dishIndex < section.dishes.length; dishIndex++) {
                  const dish = section.dishes[dishIndex];
                  dishArea.innerHTML += generateDishAreaHTML(section, sectionIndex, dish, dishArea, dishIndex);
            }
      }
}

function renderBasket() {
      subtotalValue = 0;
      document.getElementById(`basket-item-area`).innerHTML = '';
      document.getElementById(`basket-cost-area`).innerHTML = '';
      if (basketItemCounter == 0) {
            document.getElementById(`basket-item-area`).innerHTML = generateBasketEmptyMessageHTML();
      } else {
            document.getElementById(`basket-cost-area`).innerHTML = generateBasketCostAreaHTML();
            if (shipping == true) {
                  document.getElementById('shipping-cost-container').innerHTML += `<td>Lieferkosten</td>
                    <td class="text-align-right" id="shipping-cost"></td>`;
            }
      }

      for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
            if (basket[basketIndex].amount >= 1) {
                  document.getElementById(`basket-item-area`).innerHTML += generateBasketItemHTML(basketIndex);
                  calcSums(basketIndex);
            }
      }
}

function getSavedArrays() {}

function openAddDishDialog(sectionIndex, dishIndex) {
      document.getElementById(`add-dish-dialog-container`).classList.remove('display-none');
      document.getElementById(`add-dish-dialog`).innerHTML = '';
      document.getElementById(`add-dish-dialog`).innerHTML += generateDishDialogHTML(sectionIndex, dishIndex);
}

function closeAddDishDialog() {
      document.getElementById(`add-dish-dialog-container`).classList.add('display-none');
}

function addToBasket(sectionIndex, dishIndex) {
      let newBasketItem = menu[sectionIndex].dishes[dishIndex];
      if (newBasketItem.amount == undefined || newBasketItem.amount == 0) {
            newBasketItem.amount = 1;
            basket.push(newBasketItem);
      } else {
            newBasketItem.amount++;
      }
      basketItemCounter++;

      closeAddDishDialog();
      render();
}

function calcSums(basketIndex) {
      let basketItem = basket[basketIndex];
      let itemPriceSum = document.getElementById(`${basketIndex}-item-price-sum`);
      let itemPriceSumValue = basketItem.price * basketItem.amount;
      itemPriceSum.innerHTML = `${itemPriceSumValue.toFixed(2).replace('.', ',')}` + '€';

      let subtotal = document.getElementById('subtotal');
      subtotalValue += itemPriceSumValue;
      subtotal.innerHTML = subtotalValue.toFixed(2).replace('.', ',') + '€';

      let shippingCost = document.getElementById('shipping-cost');
      if (shipping == true) {
            shippingCostValue = 1.5;
            shippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
      } else {
            shippingCostValue = 0;
      }

      let total = document.getElementById('total');
      let totalValue = subtotalValue + shippingCostValue;
      total.innerHTML = totalValue.toFixed(2).replace('.', ',') + '€';
}

function subtractOneFromAmount(basketIndex) {
      let basketItem = basket[basketIndex];
      basketItem.amount--;
      if (basketItem.amount == 0) {
            basket.splice(basketIndex, 1);
      }
      basketItemCounter--;
      render();
}

function addOneToAmount(basketIndex) {
      let basketItem = basket[basketIndex];
      basketItem.amount++;
      basketItemCounter++;
      render();
}

function shippingYes() {
      document.getElementById('shipping-yes-container').classList.add('background-white');
      document.getElementById('shipping-no-container').classList.remove('background-white');
      shipping = true;
      render();
}

function shippingNo() {
      document.getElementById('shipping-yes-container').classList.remove('background-white');
      document.getElementById('shipping-no-container').classList.add('background-white');
      shipping = false;
      render();
}
