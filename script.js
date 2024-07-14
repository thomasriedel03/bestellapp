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
                  dishArea.innerHTML += generateDishAreaHTML(sectionIndex, dish, dishIndex);
            }
      }
}

function renderBasket() {
      subtotalValue = 0;
      document.getElementById(`basket-item-area`).innerHTML = '';
      document.getElementById(`basket-cost-area`).innerHTML = '';
      if (basket.length == 0) {
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

function getSavedArrays() {
      if (getArray('menu') !== null) {
            menu = getArray('menu');
      }
      if (getArray('basket') !== null) {
            basket = getArray('basket');
      }

      reestablishReferences();
}

function openAddDishDialog(sectionIndex, dishIndex) {
      if (menu[sectionIndex].dishes[dishIndex].variations.length !== 0) {
            document.getElementById(`add-dish-dialog-container`).classList.remove('display-none');
            document.getElementById(`add-dish-dialog`).innerHTML = '';
            document.getElementById(`add-dish-dialog`).innerHTML += generateDishDialogHTML(sectionIndex, dishIndex);
            renderVariationSelector(sectionIndex, dishIndex);
      } else {
            addToBasket(sectionIndex, dishIndex);
      }
}

function renderVariationSelector(sectionIndex, dishIndex) {
      let variationSelector = document.getElementById(`${sectionIndex}.${dishIndex}-variation-selector`);
      let variations = menu[sectionIndex].dishes[dishIndex].variations;
      for (let variationIndex = 0; variationIndex < variations.length; variationIndex++) {
            variationSelector.innerHTML += /*html*/ `
                  <option value="${variations[variationIndex].variationPrice}">${variations[variationIndex].variation}: ${variations[variationIndex].variationPrice}€</option>
            `;
      }
      console.log('variation-selector rendered');
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

      closeAddDishDialog();
      setMenuAndBasketArrays();
      render();
}

function calcSums(basketIndex) {
      calcSubtotal(basketIndex);
      calcShippingCost();
      calcTotal();
}

function calcSubtotal(basketIndex) {
      let basketItem = basket[basketIndex];
      let itemPriceSum = document.getElementById(`${basketIndex}-item-price-sum`);
      let itemPriceSumValue = basketItem.price * basketItem.amount;
      itemPriceSum.innerHTML = `${itemPriceSumValue.toFixed(2).replace('.', ',')}` + '€';

      let subtotal = document.getElementById('subtotal');
      subtotalValue += itemPriceSumValue;
      subtotal.innerHTML = subtotalValue.toFixed(2).replace('.', ',') + '€';
}
function calcShippingCost() {
      let shippingCost = document.getElementById('shipping-cost');
      if (shipping == true && subtotalValue < 30) {
            shippingCostValue = 2.5;
            shippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
      } else if (shipping == true && subtotalValue >= 30) {
            shippingCostValue = 0;
            shippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
      } else {
            shippingCostValue = 0;
      }
}
function calcTotal() {
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
      setMenuAndBasketArrays();
      render();
}

function addOneToAmount(basketIndex) {
      let basketItem = basket[basketIndex];
      basketItem.amount++;
      setMenuAndBasketArrays();
      render();
}

function shippingYes() {
      document.getElementById('shipping-yes-container').classList.add('background-white');
      document.getElementById('shipping-no-container').classList.remove('background-white');
      shipping = true;
      setMenuAndBasketArrays();
      render();
}

function shippingNo() {
      document.getElementById('shipping-yes-container').classList.remove('background-white');
      document.getElementById('shipping-no-container').classList.add('background-white');
      shipping = false;
      setMenuAndBasketArrays();
      render();
}
