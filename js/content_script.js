var videoUrl = document.getElementsByTagName('param')[0];

if (!videoUrl) {
    chrome.runtime.sendMessage({
        type: "navideo-playerurl-information",
        error: "获取下载链接失败。"
    });
} else {
    var msg = {
        type: "navideo-playerurl-information",
        url: videoUrl.value
    };
    chrome.runtime.sendMessage(msg);
}

var t = document.createElement("script");
t.type = "text/javascript",
t.text = "navigator.__defineGetter__('userAgent', function () { return 'Novasoft NetPlayer/4.0'; });",
document.getElementsByTagName("head")[0].appendChild(t);