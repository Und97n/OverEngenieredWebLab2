import Field from "../model/Field.js";
import Rule from "../model/Rule.js"

export default class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.model.setOnFieldChangeCallback((e) => this.onFieldChangeCallback(e));
        this.view.setControllerOnAddField(this.addField);
        this.view.setControllerOnDelField(this.delField);
        this.view.setControllerOnFieldChange((e, d) => this.onFieldUpdateСallback(e, d));

        this.model.setOnRuleChangeCallback((e) => this.onRuleChangeCallback(e));
        this.view.setControllerOnAddRule(this.addRule);
        this.view.setControllerOnDelRule(this.delRule);
        this.view.setControllerOnRuleChange((e, d) => this.onRuleUpdateCallback(e, d))

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
                this.model.getFieldById(value.data.fieldId).ruleIsApplied = value.data.result;
            }
        }
    }

    onFieldUpdateСallback(id, text) {
        let field = this.model.getFieldById(id);
        field.text = text;
        let rule = this.model.getRuleById(field.ruleId);
        this.worker.postMessage({fieldId: field.id, regexp: rule.regexp, text: text});
    }

    onRuleUpdateCallback(id, text) {
        // Just delete rule
        if (text == "") {
            this.delRule(id);
        } else {
            let rule = this.model.getRuleById(id);
            rule.text = text;
            rule.regexp = new RegExp(text);
    
            let to_update = this.model.fields.filter((field) => field.ruleId == id);
    
            to_update.forEach(element => {
                // Bad practice...
                this.onFieldUpdateСallback(element.id, element.text);
            });
        }
    }

    onFieldChangeCallback(field) {
        document.querySelector('#fields-lst').innerHTML = this.view.fieldsToHtml();
    }

    onRuleChangeCallback(rule) {
        document.querySelector('#rules-lst').innerHTML = this.view.rulesToHtml();  
    }

    addField() {
        if (this.model.rules.length == 0) {
            alert("No rules are defined");
        } else {
            var rl = Math.floor(Math.random()*this.model.rules.length);
            console.log("Rule for new field: " + rl);
            const field = new Field(Math.round(Math.random()*100000), this.model.rules[rl].id);
            this.model.addField(field);
        }
    }

    delField(id) {
        this.model.deleteField(this.model.getFieldById(id));
    }

    addRule(text) {
        if(text != null) {
            let rule = new Rule(Math.round(Math.random()*100000), text);
            this.model.addRule(rule);
        }
    }

    delRule(id) {
        this.model.deleteRule(this.model.getRuleById(id));

        // Because of Proxy
        let to_delete = this.model.fields.filter((field) => field.ruleId == id);

        to_delete.forEach(element => {
            this.model.deleteField(element);
        });
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