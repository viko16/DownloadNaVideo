var ua = "Novasoft NetPlayer/4.0"; //模拟的UA
var videourl = ''; //真实下载地址
/*
 * 检测标签页网址，如果正确就显示图标
 */
chrome.tabs.onUpdated.addListener(function(tabId, obj, tab) {
    if (tab.url.indexOf('http://na.sise.cn/movie/Video/?') != -1) {
        chrome.pageAction.show(tabId);
    }
});

/*
 * 获得从页面读取的下载链接
 */
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
    if (msg.type != "navideo-playerurl-information") return; //如果type不对，即错误请求
    if (msg.error) {
        alert(msg.error);
        return;
    } else {
        videourl = msg.url;
    }
});

/*
 * 点击图标，改变ua，开始下载
 */
chrome.pageAction.onClicked.addListener(function() {

    /* 拦截默认ua，修改为特定的 */
    chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
        for (var i = 0; i < details.requestHeaders.length; ++i) {
            if (details.requestHeaders[i].name === 'User-Agent') {
                details.requestHeaders[i].value = ua;
                break;
            }
        }
        return {
            requestHeaders: details.requestHeaders
        };
    },
    {
        urls: ["<all_urls>"]
    },
    ["blocking", "requestHeaders"]);
    /* 执行下载 */
    chrome.downloads.download({
        url: videourl + "?agent=powerpxp&session=649963249",
        saveAs: true
    });

});