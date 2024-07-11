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

function generateBasketItemHTML(sectionCounter, dishesCounter) {
      let basketItem = menu[sectionCounter].dishes[dishesCounter];
      return /*html*/ `
        <div class="flex-space-between">
            <h4>${basketItem.name}</h4>
            <p id="${sectionCounter}.${dishesCounter}-item-price-sum"></p>
        </div>
        <div class="basket-annotation-amount-container">
            <p class="margin-0 text-decoration-underline cursor-pointer">Anmerkung <br> hinzufügen</p>
            <div class="amount-container">
                <button onclick="subtractOneFromAmount(${sectionCounter}, ${dishesCounter})" class="amount-button">-</button>
                <p class="margin-0">${basketItem.amount}</p>
                <button onclick="addOneToAmount(${sectionCounter}, ${dishesCounter})" class="amount-button">+</button>
            </div>
            
        </div>
        <div class="horizontal-separator"></div>
    `;
}

function generateBasketEmptyMessageHTML() {
      return /*html*/ `
        <h2 class="text-align-center">Fülle deinen Warenkorb</h1>
        <p class="text-align-center">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</p>
    `;
}

function generateBasketCostAreaHTML() {
      return /*html*/ `
        <div class="flex-space-between">
            <p>Zwischensumme</p>
            <p>Preis</p>
        </div>
    `;
}
