export default class FieldView {
    constructor(fieldModel) {
        this.fieldModel = fieldModel;
    }

    toHtml() {
        const applied = (this.fieldModel.ruleIsApplied) ? "correct" : "wrong";
        const color = (this.fieldModel.ruleIsApplied) ? "green" : "red";
        return `
            <tr>
                <td>
                    <button data-id="${this.fieldModel.id}" class="delf-button">x</button>
                </td>
                <td>
                    <input style="border-color: ${color}"id="${this.fieldModel.id}" type="text" value=${this.fieldModel.text}>
                </td>
                <td>
                    ${applied}
                </td>
            </tr>`;
    }
}