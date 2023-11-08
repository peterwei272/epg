const isDateValid = (...val) => !Number.isNaN(new Date(...val).valueOf());

let body = $response.body;
if (!isJsonString(body)) {
	$done({})
}
let body_obj = JSON.parse(body);
parseJson(body_obj)
let new_body = JSON.stringify(body_obj)
$done({body: new_body})

function parseJson(jsonObj) {
    for(var key in jsonObj) {
        var element = jsonObj[key];
        if (element.length > 0 && typeof(element) == "object" || typeof(element) == "object") {
            parseJson(element);
        } else if (key == 'DateCreated' && typeof(element) == "string") {
            if (!isDateValid(element)) {
                jsonObj[key] = "2020-01-01T00:00:00.0000000Z";
            }
        }
    }
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
