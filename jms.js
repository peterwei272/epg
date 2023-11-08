let headers = $request.headers;
var url = $request.url;
if (headers['x-emby-authorization'] == undefined) {
    var a = 'X-Emby-Authorization'
} else {
    var a = 'x-emby-authorization'
}
if (headers['user-agent'] == undefined) {
    var b = 'User-Agent'
} else {
    var b = 'user-agent'
}
if (headers[a] != undefined && headers[a].indexOf('Infuse') != -1) {
    var start = 10 + headers[a].indexOf('DeviceId="')
    var end = headers[a].indexOf('"', start+1)
    let deviceid = headers[a].slice(start,end)
    if (headers[a].indexOf('Token="') != -1) {
        start = 7+headers[a].indexOf('Token="');
        end = headers[a].indexOf('"', start+1);
        token = headers[a].slice(start,end);
        headers[a] = 'MediaBrowser Version="4.7.14.0", Token="'+token+'", Client="Emby Web", Device="Safari macOS", DeviceId="'+deviceid+'"';
    } else {
        headers[a] = 'MediaBrowser Version="4.7.14.0", Client="Emby Web", Device="Safari macOS", DeviceId="'+deviceid+'"';
    }
}
if (headers[b] != undefined && headers[b].indexOf('Infuse') != -1) {
    headers[b] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15';
}
if (url.indexOf('stream.mkv') != -1) {
    url = url.replace('stream.mkv', 'stream')
}
$done({headers: headers, url: url});
