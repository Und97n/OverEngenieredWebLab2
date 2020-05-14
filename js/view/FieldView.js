export default class FieldView {
    constructor(fieldModel) {
        this.fieldModel = fieldModel;
    }

    toHtml() {
        const applied = (this.fieldModel.applied) ? "correct" : "wrong";
        const color = (this.fieldModel.applied) ? "green" : "red";
        return `
            <tr>
                <td style="color: ${color}">
                    <input id="${this.fieldModel.id}" type="text" value=${this.fieldModel.text}>
                </td>
                <td>
                    ${applied}
                </td>
                <td>
                    <button data-id="${this.fieldModel.id}" class="delf-button">Delete</button>
                </td>
            </tr>`;
    }
}