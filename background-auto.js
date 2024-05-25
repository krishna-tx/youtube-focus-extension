const watchURL = "https://www.youtube.com/watch";
const resultsURL = "https://www.youtube.com/results";
const homeURL = "https://www.youtube.com/";
const reloadedHomeURL = "https://www.youtube.com/?";
const shortsURL = "https://www.youtube.com/shorts";

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if(tab.url && tab.url.includes(homeURL)) { // check if url exists and is a youtube url
        await chrome.scripting.insertCSS({
            files: ["shorts-removal.css"],
            target: {tabId: tab.id}
        });

        // check if page is a home page => hide recommendations
        if(tab.url == homeURL || tab.url.includes(reloadedHomeURL)) {
            await chrome.scripting.insertCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
        }
        // check if page is a video page => hide related videos/shorts
        else if(tab.url.includes(watchURL)) {
            await chrome.scripting.insertCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });
        }
        // check if page is a results page => hide shorts
        else if(tab.url.includes(resultsURL)) {
            console.log("results page");
            await chrome.scripting.insertCSS({
                files: ["results-page.css"],
                target: {tabId: tab.id}
            });
        }
        // otherwise => remove css
        else {
            await chrome.scripting.removeCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });
            await chrome.scripting.removeCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
        }
    }
});