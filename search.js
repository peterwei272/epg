if (url.indexOf('SearchTerm') == -1) {
    $done({})
}
let body = $response.body;
if (body == undefined || !isJsonString(body)) {
    $done({})
}
try {
    let body_obj = JSON.parse(body);
    parseJson(body_obj)
    let new_body = JSON.stringify(body_obj)
    $done({body: new_body})
} catch(e) {
    $done({})
}

function parseJson(jsonObj) {
    jsonObj['TotalRecordCount'] = jsonObj['Items'].length
}

function isJsonString(str) {
    try {
        if (typeof JSON.parse(str) == "object") {
            return true;
        }
    } catch(e) {
    }
    return false;
}
