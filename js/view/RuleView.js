export default class ruleView {
    constructor(ruleModel) {
        this.ruleModel = ruleModel;
    }

    toHtml() {
        return `
            <tr>
                <td>
                    <button data-id="${this.ruleModel.id}" class="delr-button">x</button>
                </td>
                <td style="color: gray">
                    <input class="txtf" type="text" value=${this.ruleModel.text} id="${this.ruleModel.id}">
                </td>
            </tr>`;
    }
}