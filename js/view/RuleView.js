export default class ruleView {
    constructor(ruleModel) {
        this.ruleModel = ruleModel;
    }

    toHtml() {
        return `
            <tr>
                <td style="color: gray">
                    ${this.ruleModel.text}
                </td>
                <td>
                    ${this.ruleModel.id}
                </td>
                <td>
                    <button data-id="${this.ruleModel.id}" class="delr-button">Delete</button>
                </td>
            </tr>`;
    }
}