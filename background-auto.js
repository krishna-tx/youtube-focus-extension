const watchURL = "https://www.youtube.com/watch";
const resultsURL = "https://www.youtube.com/results";
const homeURL = "https://www.youtube.com/";
const reloadedHomeURL = "https://www.youtube.com/?";

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if(tab.url && tab.url.includes(homeURL)) { // check if url exists and is a youtube url
        // check if page is a home page => hide recommendations
        if(tab.url == homeURL || tab.url.includes(reloadedHomeURL)) {
            // remove css
            chrome.scripting.removeCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });
            chrome.scripting.removeCSS({
                files: ["results-page.css"],
                target: {tabId: tab.id}
            });

            // insert css
            chrome.scripting.insertCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
        }
        // check if page is a video page => hide related videos/shorts
        else if(tab.url.includes(watchURL)) {
            // remove css
            chrome.scripting.removeCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
            chrome.scripting.removeCSS({
                files: ["results-page.css"],
                target: {tabId: tab.id}
            });

            // insert css
            chrome.scripting.insertCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });
        }
        // check if page is a results page => hide shorts
        else if(tab.url.includes(resultsURL)) {
            // remove css
            chrome.scripting.removeCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
            chrome.scripting.removeCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });

            // insert css
            chrome.scripting.insertCSS({
                files: ["results-page.css"],
                target: {tabId: tab.id}
            });
        }
        // otherwise => remove css
        else {
            chrome.scripting.removeCSS({
                files: ["home-page.css"],
                target: {tabId: tab.id}
            });
            chrome.scripting.removeCSS({
                files: ["results-page.css"],
                target: {tabId: tab.id}
            });
            chrome.scripting.removeCSS({
                files: ["watch-page.css"],
                target: {tabId: tab.id}
            });
        }
    }
});