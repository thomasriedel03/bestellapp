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
                <button onclick="openAddDishDialog(${sectionIndex},${dish},${dishIndex})" class="add-dish-button" id="${sectionIndex}.${dishIndex}-add-dish-button">+</button>
            </div>
            <h5>${dish.ingredients}</h5>
            <h4>${dish.price}€</h4>
        </div>
    `;
}
