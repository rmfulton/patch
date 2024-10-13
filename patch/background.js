const blockedSites = [
    "*:////www.instagram.com/*",
    "*://twitter.com/*", // X is now Twitter
    "*:////www.facebook.com/*",
    "*:////www.tiktok.com/*"
  ];
  
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return { cancel: true };
    },
    { urls: blockedSites },
    ["blocking"]
  );