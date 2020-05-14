// {fieldId, regexp, text} -> {fieldId, result}

onmessage = (value) => {
    if (value.data.value != null && value.data.value != NaN && value.data.value != undefined) {
        console.log(value.data.text);
        postMessage({fieldId: value.data.fieldId, result: value.data.regexp.test(value.data.text)});
    }
}