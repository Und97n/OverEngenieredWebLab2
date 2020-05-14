export default class Model {
    constructor() {
        this.fields = [];
        this.rules = [];
        this.onFieldChangeCallback = null;
        this.onRuleChangeCallback = null;
    }

    getFieldById(id) {
        // There are some problems with `find`, so numbers
        return this.fields[this.fields.findIndex((x) => x.id === id)];
    }

    getRuleById(id) {
        // There are some problems with `find`, so numbers
        return this.rules[this.rules.findIndex((x) => x.id === id)];
    }

    addField(field) {
        field.onChangeCallback = this.onFieldChangeCallback;
        this.fields.push(field);
    }

    addRule(rule) {
        rule.onChangeCallback = this.onRuleChangeCallback;
        this.rules.push(rule);
    }

    deleteField(fieldId) {
        const fieldIndex = this.fields.findIndex((field) => field.id === fieldId); 
        this.fields.splice(fieldIndex, 1);
    }

    deleteRule(ruleId) {
        const ruleIndex = this.rules.findIndex( (rule) => rule.id === ruleId); 
        this.rules.splice(ruleIndex, 1);
    }

    setOnFieldChangeCallback(onChangeCallback) {
        this.onFieldChangeCallback = onChangeCallback;
    }

    setOnRuleChangeCallback(onChangeCallback) {
        this.onRuleChangeCallback = onChangeCallback;
    }

}