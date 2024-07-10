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
      for (let basketIndex = 0; basketIndex < basket.length; basketIndex++) {
            document.getElementById(`basket-item-area`).innerHTML += generateBasketHTML(basketIndex);
      }
      if (basket[0] == null) {
            document.getElementById(`basket-item-area`).innerHTML += generateBasketEmptyMessageHTML();
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
      basket.push(menu[sectionIndex].dishes[dishIndex]);
      closeAddDishDialog();
      render();
}
