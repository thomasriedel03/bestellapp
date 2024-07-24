function generateResponsiveBasketCostAreaHTML() {
      return /*html*/ `
        <table id="cost-area-table">
            <tbody>
                <tr>
                    <td>Zwischensumme</td>
                    <td class="text-align-right" id="responsive-subtotal"></td>
                </tr>
                <tr id="responsive-shipping-cost-container">
                </tr>
                <tr>
                    <th class="text-align-left">Gesamtsumme</th>
                    <th class="text-align-right" id="responsive-total"></th>
                </tr>
            </tbody>
        </table>
        `;
}
