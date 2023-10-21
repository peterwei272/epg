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
if (headers[b].indexOf('Infuse') != -1) {
    var start = 10 + headers[a].indexOf('DeviceId="')
    var end = headers[a].indexOf('"', start+1)
    let deviceid = headers[a].slice(start,end)
    if (url.indexOf('Users/AuthenticateByName') != -1) {
        headers[b] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15';
        headers[a] = 'MediaBrowser Version="4.7.14.0", Client="Emby Web", Device="Safari macOS", DeviceId="'+deviceid+'"';
    } else {
        var start = 7+headers[a].indexOf('Token="');
        var end = headers[a].indexOf('"', start+1);
        var token = headers[a].slice(start,end);
        headers[b] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15';
        headers[a] = 'MediaBrowser Version="4.7.14.0", Token="'+token+'", Client="Emby Web", Device="Safari macOS", DeviceId="'+deviceid+'"';
    }
}
$done({headers});
