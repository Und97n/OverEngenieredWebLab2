export default class Model {
    constructor() {
        this.fields = [];
        this.rules = [];
        this.onFieldChangeCallback = null;
        this.onRuleChangeCallback = null;
    }

    getFieldById(id) {
        // There are some problems with `find`, so numbers
        return this.fields[this.fields.findIndex((x) => x.id == id)];
    }

    getRuleById(id) {
        // There are some problems with `find`, so numbers
        return this.rules[this.rules.findIndex((x) => x.id == id)];
    }

    addField(field) {
        field.onChangeCallback = this.onFieldChangeCallback;
        this.fields.push(field);
    }

    addRule(rule) {
        rule.onChangeCallback = this.onRuleChangeCallback;
        this.rules.push(rule);
    }

    deleteField(field) {
        this.fields.splice(this.fields.indexOf(field), 1);
    }

    deleteRule(rule) {
        this.rules.splice(this.rules.indexOf(rule), 1);
    }

    setOnFieldChangeCallback(onChangeCallback) {
        this.onFieldChangeCallback = onChangeCallback;
    }

    setOnRuleChangeCallback(onChangeCallback) {
        this.onRuleChangeCallback = onChangeCallback;
    }

}