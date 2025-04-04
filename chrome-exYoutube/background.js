chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo == "complete", tab.url && tab.url.includes("youtube.com/watch")) {
        const urlBody = tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(urlBody);
        console.log(urlParameters);

        chrome.tabs.sendMessage(tabId, {
            type: "NEW",
            videoId: urlParameters.get("v")
        });
    }
});
