import Field from "../model/Field.js";
import Rule from "../model/Rule.js"

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.setOnFieldChangeCallback((e) => this.onFieldChangeCallback(e));
        this.view.setControllerOnAddField(this.addField);
        this.view.setControllerOnDelField(this.delField);
        this.view.setControllerOnFieldChange((e) => this.onFieldUpdateСallback(e));

        this.model.setOnRuleChangeCallback((e) => this.onRuleChangeCallback(e));
        this.view.setControllerOnAddRule(this.addRule);
        this.view.setControllerOnDelRule(this.delRule);
        this.view.setControllerOnRuleChange((e) => this.onRuleUpdateCallback(e))

        this.initOnModelChange();

        document.querySelector('#add-field').addEventListener('click', (e)=> {
            var i = prompt("How many fields?", 1);
            for (; i > 0; --i) {
                view.onAddField(e);
            } 
        });
        document.querySelector('#add-rule').addEventListener('click', (e)=>view.onAddRule(e));

        this.worker = new Worker('js/worker.js');
        this.worker.onmessage = (value) => {
            if (value.data != null && value.data != undefined && value.data != NaN) {
                this.fieldListModel.fields.find(x => x.id = value.data.fieldId).ruleIsApplied = value.data.result;
            }
        }
    }

    onFieldUpdateСallback(id) {
        var field = this.model.getFieldById(id);
        var rule = this.model.getRuleById(field.ruleId);
        this.worker.postMessage({fieldId: field.id, regexp: rule.regexp, text: field.text});
    }

    onRuleUpdateCallback(rule) {
        rule.regexp = new RegExp(rule.text);
    }

    onFieldChangeCallback(field) {
        document.querySelector('#fields-lst').innerHTML = this.view.fieldsToHtml();
    }

    onRuleChangeCallback(rule) {
        document.querySelector('#rules-lst').innerHTML = this.view.rulesToHtml();  
    }

    addField() {
        var rl = this.model.rules.length;
        const field = new Field(Math.round(Math.random()*100000), Math.round(Math.random()*rl));
        this.model.addField(field);
    }

    delField(id) {+
        this.model.deleteField(id);
    }

    addRule(text) {
        const rule = new Rule(Math.round(Math.random()*100000), text);
        this.model.addRule(rule);
    }

    delRule(id) {
        this.model.deleteRule(id);
    }

    initOnModelChange() {
        let handler1 = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#fields-lst').innerHTML = this.view.fieldsToHtml();

                return true;
            }
        }
        this.model.fields = new Proxy(this.model.fields, handler1);

        let handler2 = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                document.querySelector('#rules-lst').innerHTML = this.view.rulesToHtml();
                return true;
            }
        }
        this.model.rules = new Proxy(this.model.rules, handler2);
    }
}