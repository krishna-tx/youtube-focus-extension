chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const watchURL = "https://www.youtube.com/watch";
const homeURL = "https://www.youtube.com";
chrome.action.onClicked.addListener(async (tab) => {
    // check if page is a video page
    if(tab.url.includes(watchURL)) {
        const currState = await chrome.action.getBadgeText({tabId: tab.id});
        let nextState;
        if(currState == "OFF") { nextState = "ON"; }
        else { nextState = "OFF"; }

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if(nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["watch-page.css"],
                target: { tabId: tab.id }
            });
        }
        else {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["watch-page.css"],
                target: { tabId: tab.id }
            });
        }
    }
    // check if page is a home page
    else if(tab.url.includes(homeURL)) {
        const currState = await chrome.action.getBadgeText({tabId: tab.id});
        let nextState;
        if(currState == "OFF") { nextState = "ON"; }
        else { nextState = "OFF"; }

        // Set the action badge to the next state
        await chrome.action.setBadgeText({
            tabId: tab.id,
            text: nextState
        });

        if(nextState === "ON") {
            // Insert the CSS file when the user turns the extension on
            await chrome.scripting.insertCSS({
                files: ["home-page.css"],
                target: { tabId: tab.id }
            });
        }
        else {
            // Remove the CSS file when the user turns the extension off
            await chrome.scripting.removeCSS({
                files: ["home-page.css"],
                target: { tabId: tab.id }
            });
        }
    }
});
