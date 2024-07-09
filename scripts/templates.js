function generateMenuSectionHTML(section, sectionIndex) {
      return /*html*/ `
        <h2>${section.section}</h2>
        <h6>${section.description}</h6>
        <div id="${sectionIndex}-dish-area">
        </div>
    `;
}

function generateDishAreaHTML(section, sectionIndex, dish, dishArea, dishIndex) {
      return /*html*/ `
        <div class="dish">
            <div class="name-button-container">
                <h3>${dish.name}</h3>
                <button onclick="openAddDishDialog(${sectionIndex},${dishIndex})" class="add-dish-button" id="${sectionIndex}.${dishIndex}-add-dish-button">+</button>
            </div>
            <h5>${dish.ingredients}</h5>
            <h4>${dish.price}€</h4>
        </div>
    `;
}

function generateDishDialogHTML(sectionIndex, dishIndex) {
      return /*html*/ `
        <button class="close-dialog-button" onclick="closeAddDishDialog()">X</button>
        <h1>${menu[sectionIndex].dishes[dishIndex].name}</h1>
        <h3>${menu[sectionIndex].dishes[dishIndex].ingredients}</h3>
        <h2>${menu[sectionIndex].dishes[dishIndex].price}€</h2>
        <button class="add-to-basket-button" onclick="addToBasket(${sectionIndex}, ${dishIndex})">Zum Warenkorb hinzufügen</button>
        

    `;
}
