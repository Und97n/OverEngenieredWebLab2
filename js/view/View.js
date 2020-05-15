import FieldView from './FieldView.js';
import RuleView from './RuleView.js';

export default class View {
    constructor(model) {
        this.model = model;
        
        this.controllerOnAddField = null;
        this.controllerOnDelField = null;
        
        this.controllerOnAddRule = null;
        this.controllerOnDelRule = null;

        this.controllerOnFieldChange = null;
        this.controllerOnRuleChange = null;

        document.querySelector('#fields-lst').addEventListener('input', (e) => this.onFieldChange(e));

        document.querySelector('#rules-lst').addEventListener('input', (e) => this.onRuleChange(e));

        document.querySelector('#fields-lst').addEventListener('click', (e) => this.onFieldClick(e));
        
        document.querySelector('#rules-lst').addEventListener('click', (e) => this.onRuleClick(e));
    }

    setControllerOnAddField(fn) {
        this.controllerOnAddField = fn;
    }

    setControllerOnDelField(fn) {
        this.controllerOnDelField = fn;
    }

    setControllerOnAddRule(fn) {
        this.controllerOnAddRule = fn;
    }

    setControllerOnDelRule(fn) {
        this.controllerOnDelRule = fn;
    }

    setControllerOnFieldChange(fn) {
        this.controllerOnFieldChange = fn;
    }

    setControllerOnRuleChange(fn) {
        this.controllerOnRuleChange = fn;
    }

    onFieldChange(e) {
        this.controllerOnFieldChange(Number(e.target.id), e.target.value);
    }

    onRuleChange(e) {
        this.controllerOnRuleChange(Number(e.target.id), e.target.value);
    }

    onFieldClick(e) {
        if (e.target.className === 'delf-button') {
            this.controllerOnDelField(e.target.dataset.id);
            return;
        } 
    }

    onRuleClick(e) {
        if (e.target.className === 'delr-button') {
            this.controllerOnDelRule(e.target.dataset.id);
            return;
        } 
    }

    onAddField(e) {
        this.controllerOnAddField();
    }

    onAddRule(e) {    
        const title = prompt('Enter the regexp:', '');
        this.controllerOnAddRule(title);
    }

    fieldsToHtml() {
        const fieldsHtml = this.model.fields.map( (field) => {
            const fieldView = new FieldView(field);
            return fieldView.toHtml();
        }).join("");
        return `<table border="0">${fieldsHtml}</table>`;
    }

    rulesToHtml() {
        const rulesHtml = this.model.rules.map( (rule) => {
            const ruleView = new RuleView(rule);
            return ruleView.toHtml();
        }).join("");
        return `<table border="0">${rulesHtml}</table>`;
    }
}