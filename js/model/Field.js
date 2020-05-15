export default class Field {
    constructor(id, ruleId) {
        this.id = id;

        this.text = "";
        this.ruleId = ruleId;
        this.ruleIsApplied = false;

        this.onChangeCallback = null;
        return this.initOnModelChange();
    }

    setOnChangeCallback() {
        this.onChangeCallback = onChangeCallback;
    }

    initOnModelChange() {
        let handler = {
            set: (obj, prop, val) => {
                obj[prop] = val;
                if (this.onChangeCallback && prop != "text") this.onChangeCallback(this);
                return true;
            }
        }
        return new Proxy(this, handler);
    }
}