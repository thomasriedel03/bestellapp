function render() {
      getSavedArrays();
      renderQuickselectionSection();
      renderMenu();
      renderBasket();
      renderResponsiveBasket();
}

function renderQuickselectionSection() {
      let quickselctionSection = document.getElementById('quickselection-section');
      quickselctionSection.innerHTML = '';
      for (let sectionIndex = 0; sectionIndex < menu.length; sectionIndex++) {
            const section = menu[sectionIndex];
            quickselctionSection.innerHTML += /*html*/ `
            <a href="#${sectionIndex}-menu-section">${section.section}</a>
        `;
      }
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
            }
            if ('ingredients' in basket[basketIndex]) {
            } else {
                  let basketItemName = document.getElementById(`${basketIndex}-basket-item-name`);
                  basketItemName.innerHTML += ' (' + basket[basketIndex].variation + ')';
            }
      }
}

function renderResponsiveBasket() {
      subtotalValue = 0;
      document.getElementById(`responsive-basket-item-area`).innerHTML = '';
      document.getElementById(`responsive-basket-cost-area`).innerHTML = '';
      if (basket.length == 0) {
            document.getElementById(`responsive-basket-item-area`).innerHTML = generateBasketEmptyMessageHTML();
      } else {
            document.getElementById(`responsive-basket-cost-area`).innerHTML = generateResponsiveBasketCostAreaHTML();
            if (shipping == true) {
                  document.getElementById('responsive-shipping-cost-container').innerHTML += `<td>Lieferkosten</td>
                    <td class="text-align-right" id="responsive-shipping-cost"></td>`;
            }
      }

      for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
            if (basket[basketIndex].amount >= 1) {
                  document.getElementById(`responsive-basket-item-area`).innerHTML += generateBasketItemHTML(basketIndex);
                  calcSums(basketIndex);
            }
            if ('ingredients' in basket[basketIndex]) {
            } else {
                  let basketItemName = document.getElementById(`${basketIndex}-basket-item-name`);
                  basketItemName.innerHTML += ' (' + basket[basketIndex].variation + ')';
            }
      }
}

function openResponsiveBasket() {
      document.getElementById('responsive-basket').classList.remove('display-none');
}

function closeResponsiveBasket() {
      document.getElementById('responsive-basket').classList.add('display-none');
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

function addToBasket(sectionIndex, dishIndex) {
      if (menu[sectionIndex].dishes[dishIndex].variations.length !== 0) {
            document.getElementById(`add-dish-dialog-container`).classList.remove('display-none');
            document.getElementById(`add-dish-dialog`).innerHTML = '';
            document.getElementById(`add-dish-dialog`).innerHTML += generateDishDialogHTML(sectionIndex, dishIndex);
            renderVariationSelector(sectionIndex, dishIndex);
            renderSelectedPrice(sectionIndex, dishIndex);
      } else {
            addToBasketFromMenu(sectionIndex, dishIndex);
      }
}

function renderVariationSelector(sectionIndex, dishIndex) {
      let variationSelector = document.getElementById(`${sectionIndex}.${dishIndex}-variation-selector`);
      let variations = menu[sectionIndex].dishes[dishIndex].variations;
      for (let variationIndex = 0; variationIndex < variations.length; variationIndex++) {
            let price = +variations[variationIndex].price;
            let priceAsString = price.toFixed(2).replace('.', ',');
            variationSelector.innerHTML += /*html*/ `
                  <option value="${variations[variationIndex].position}">${variations[variationIndex].variation}: ${priceAsString}€</option>
            `;
      }
}
function renderSelectedPrice(sectionIndex, dishIndex) {
      let dishPrice = document.getElementById(`${sectionIndex}.${dishIndex}-dish-price`);
      let addToBasketButton = document.getElementById(`${sectionIndex}.${dishIndex}-add-to-basket-button`);
      let position = document.getElementById(`${sectionIndex}.${dishIndex}-variation-selector`).value;
      let selectedPrice = +menu[sectionIndex].dishes[dishIndex].variations[position].price;
      let selectedPriceAsString = selectedPrice.toFixed(2).replace('.', ',');
      dishPrice.innerHTML = selectedPriceAsString + '€';
      addToBasketButton.innerHTML = selectedPriceAsString + '€';
}

function closeAddDishDialog() {
      document.getElementById(`add-dish-dialog-container`).classList.add('display-none');
}

function addToBasketFromMenu(sectionIndex, dishIndex) {
      let newBasketItem = menu[sectionIndex].dishes[dishIndex];

      if (newBasketItem.amount == undefined || newBasketItem.amount == 0) {
            newBasketItem.amount = 1;
            basket.push(newBasketItem);
      } else {
            newBasketItem.amount++;
      }

      setMenuAndBasketArrays();
      render();
}

function addToBasketFromDishDialog(sectionIndex, dishIndex) {
      let selectedPosition = +document.getElementById(`${sectionIndex}.${dishIndex}-variation-selector`).value;
      let newBasketItem = menu[sectionIndex].dishes[dishIndex].variations[selectedPosition];

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
      let responsiveSubtotal = document.getElementById('responsive-subtotal');
      subtotalValue += itemPriceSumValue;
      subtotal.innerHTML = subtotalValue.toFixed(2).replace('.', ',') + '€';
      responsiveSubtotal.innerHTML = subtotalValue.toFixed(2).replace('.', ',') + '€';
}
function calcShippingCost() {
      let shippingCost = document.getElementById('shipping-cost');
      let responsiveShippingCost = document.getElementById('responsive-shipping-cost');
      if (shipping == true && subtotalValue < 30) {
            shippingCostValue = 2.5;
            shippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
            responsiveShippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
      } else if (shipping == true && subtotalValue >= 30) {
            shippingCostValue = 0;
            shippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
            responsiveShippingCost.innerHTML = shippingCostValue.toFixed(2).replace('.', ',') + '€';
      } else {
            shippingCostValue = 0;
      }
}
function calcTotal() {
      let total = document.getElementById('total');
      let responsiveTotal = document.getElementById('responsive-total');

      let totalValue = subtotalValue + shippingCostValue;

      total.innerHTML = totalValue.toFixed(2).replace('.', ',') + '€';
      responsiveTotal.innerHTML = totalValue.toFixed(2).replace('.', ',') + '€';
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
