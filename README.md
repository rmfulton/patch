# patch
A browser extension to cover the rabbit holes

## History

This repo was begun by giving GPT-4o mini the following prompt:

```
write the necessary files for a chrome extension that 1. blocks common social media sites like instagram and X, and 2. removes the secondary column of pages of youtube videos. Then explain how to publish the chrome extension in the chrome web store, and how to install it locally.
```
### GPT-4o mini's response

Creating a Chrome extension to block common social media sites and modify YouTube pages requires several files. Below are the necessary files and their content.

#### File Structure
```
my_chrome_extension/
│
├── manifest.json
├── background.js
├── content.js
```

#### 1. `manifest.json`
This JSON file contains the metadata about your extension.

```json
{
  &quot;manifest_version&quot;: 3,
  &quot;name&quot;: &quot;Social Media Blocker and YouTube Cleaner&quot;,
  &quot;version&quot;: &quot;1.&quot;,
  &quot;description&quot;: &quot;Blocks common social media sites and removes the secondary column on YouTube.&quot;,
  &quot;permissions&quot;: [
    &quot;tabs&quot;,
    &quot;webRequest&quot;,
    &quot;webRequestBlocking&quot;,
    &quot;storage&quot;,
    &quot;activeTab&quot;
  ],
  &quot;background&quot;: {
    &quot;service_worker&quot;: &quot;background.js&quot;
  },
  &quot;content_scripts&quot;: [
    {
      &quot;matches&quot;: [&quot;*:////www.youtube.com/*&quot;],
      &quot;js&quot;: [&quot;content.js&quot;]
    }
  ],
  &quot;web_accessible_resources&quot;: [
    {
      &quot;resources&quot;: [&quot;*&quot;],
      &quot;matches&quot;: [&quot;&lt;all_urls&gt;&quot;]
    }
  ]
}
```

#### 2. `background.js`
This file will handle blocking the defined social media sites.

```javascript
const blockedSites = [
  &quot;*:////www.instagram.com/*&quot;,
  &quot;*://twitter.com/*&quot;, // X is now Twitter
  &quot;*:////www.facebook.com/*&quot;,
  &quot;*:////www.tiktok.com/*&quot;
];

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    return { cancel: true };
  },
  { urls: blockedSites },
  [&quot;blocking&quot;]
);
```

#### 3. `content.js`
This script will run on the YouTube pages and remove the secondary column.

```javascript
const removeSecondaryColumn = () =&gt; {
  const secondaryColumn = document.querySelector(&#39;#secondary&#39;);
  if (secondaryColumn) {
    secondaryColumn.style.display = &#39;none&#39;;
  }
};

// Run the function when the page loads
removeSecondaryColumn();

// Also run it when navigating to a new video
const observer = new MutationObserver(removeSecondaryColumn);
observer.observe(document.body, { childList: true, subtree: true```javascript
});
```

#### Explanation of Files
1. **manifest.json**: This file describes the extension, its permissions, and specifies the content scripts and background scripts.
2. **background.js**: This file contains the logic for blocking specified URLs using the Chrome webRequest API.
3. **content.js**: This file removes the secondary column on YouTube pages by setting its display style to `none`. It also observes changes in the DOM to handle navigation within YouTube without reloading the page.

#### How to Install the Extension Locally
1. **Prepare the Extension Folder**:
   - Create a folder and name it `my_chrome_extension`.
   - Inside this folder, create the three files (`manifest.json`, `background.js`, `content.js`) with the above code snippets.

2. **Load the Extension into Chrome**:
   - Open Google Chrome and go to `chrome://extensions/`.
   - Enable **Developer mode** by toggling the switch in the upper-right corner.
   - Click on the **Load unpacked** button.
   - Select the `my_chrome_extension` folder that you created.

3. **Testing the Extension**:
   - Visit any of the blocked social media sites to see if they are blocked.
   - Go to YouTube and check if the secondary column has been removed.

### How to Publish the Extension in the Chrome Web Store
1. **Create a Developer Account**:
   - Go to the [Google Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
   - Sign in with your Google account and pay the one-time registration fee.

2. **Prepare Your Extension for Publishing**:
   - Make sure all files are properly formatted and working as intended.
   - Create an icon for your extension (at least 128x128 pixels) and include it in your folder.

3. **Package Your Extension**:
   - In Chrome, navigate to `chrome://extensions/`.
   - Click on the **Pack extension** button.
   - Select your extension’s folder and click **Pack Extension**. This will create a `.crx` file and a `.pem` file in the folder.

4. **Upload Your Extension**:
   - Go back to the Developer Dashboard.
   - Click on the **Add a new item** button.
   - Upload the `.crx` file.

5. **Fill Out The Required Information**:
   - Provide a detailed description, screenshots, and any other necessary information about your extension.

6. **Submit for Review**:
   - After filling out all the required information and making sure everything is compliant with the Chrome Web Store policies, click on the **Publish** button.

7. **Wait for Approval**:
   - The Chrome Web Store team will review your extension. Once approved, it will be published and available for users to install.

#### Summary
You've created and structured a Chrome extension that blocks certain social media websites and modifies YouTube pages. You can test it locally before going through the process to publish it on the Chrome Web Store. Make sure to follow all guidelines when submitting for review.
