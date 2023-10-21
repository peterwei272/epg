let headers = $request.headers;
headers['user-agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15';
headers['x-emby-authorization'] = 'MediaBrowser Version="4.7.14.0", Token="c33def95e41d4a42b817047845171656", Client="Emby Web", Device="Safari macOS", DeviceId="adde2bea-7dcd-4274-9c1d-50f0ba97f184"';
$done({headers});
