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
      document.getElementById(`basket-item-area`).innerHTML = '';
      document.getElementById(`basket-cost-area`).innerHTML = '';
      for (let sectionCounter = 0; sectionCounter < menu.length; sectionCounter++) {
            for (let dishesCounter = 0; dishesCounter < menu[sectionCounter].dishes.length; dishesCounter++) {
                  if (
                        menu[sectionCounter].dishes[dishesCounter].amount !== undefined &&
                        menu[sectionCounter].dishes[dishesCounter].amount !== 0
                  ) {
                        document.getElementById(`basket-item-area`).innerHTML += generateBasketItemHTML(
                              sectionCounter,
                              dishesCounter
                        );

                        calcSums(sectionCounter, dishesCounter);
                  }
            }
      }
      if (basketItemCounter == 0) {
            document.getElementById(`basket-item-area`).innerHTML += generateBasketEmptyMessageHTML();
      } else {
            document.getElementById(`basket-cost-area`).innerHTML = generateBasketCostAreaHTML();
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
      if (menu[sectionIndex].dishes[dishIndex].amount == undefined) {
            menu[sectionIndex].dishes[dishIndex].amount = 1;
      } else {
            menu[sectionIndex].dishes[dishIndex].amount++;
      }
      basketItemCounter++;
      closeAddDishDialog();
      render();
}

function calcSums(sectionCounter, dishesCounter) {
      let basketItem = menu[sectionCounter].dishes[dishesCounter];
      let itemPriceSum = document.getElementById(`${sectionCounter}.${dishesCounter}-item-price-sum`);
      itemPriceSum.innerHTML = `${(basketItem.price * basketItem.amount).toFixed(2).replace('.', ',')}` + '€';
}
function subtractOneFromAmount(sectionCounter, dishesCounter) {
      let basketItem = menu[sectionCounter].dishes[dishesCounter];
      basketItem.amount--;
      basketItemCounter--;
      render();
}

function addOneToAmount(sectionCounter, dishesCounter) {
      let basketItem = menu[sectionCounter].dishes[dishesCounter];
      basketItem.amount++;
      basketItemCounter++;
      render();
}
