// {fieldId, regexp, text} -> {fieldId, result}

onmessage = (value) => {
    if (value.data != null && value.data != NaN && value.data.text != undefined) {
        // console.log(value.data.regexp);
        // console.log(value.data.regexp.test(value.data.text));
        postMessage({fieldId: value.data.fieldId, result: value.data.regexp.test(value.data.text)});
    }
}