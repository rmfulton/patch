console.log("Loaded extension");


function blockRequest(details) {
    return { cancel: true };
}

function updateFilters(urls) {
    if (chrome.webRequest.onBeforeRequest.hasListener(blockRequest))
        chrome.webRequest.onBeforeRequest.removeListener(blockRequest);
    chrome.webRequest.onBeforeRequest.addListener(blockRequest, { urls: ["*://*.instagram.com/*", "*://*.youtube.com/youtubei/v1/reel/*"] }, ['blocking']);
}

updateFilters();