console.log("Never gonna give you up,\nNever gonna let you down,\nNever gonna glitch around and distract you!");

chrome.action.enable();

async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

async function getSyncStorage(key){
    return new Promise((resolve) => {
        chrome.storage.sync.get([key], (result) => {
            resolve(result[key]);
        });
    });
}
async function setSyncStorage(key, value){
    var queryObject = {};
    queryObject[key] = value;
    chrome.storage.sync.set(queryObject);
}
(async function(){
    var blockedSites = await getSyncStorage("blockedSites");
    if(blockedSites == undefined){
        await setSyncStorage("blockedSites", [
            "https://www.facebook.com/",
            "https://twitter.com/",
            "https://www.instagram.com/",
            "https://web.snapchat.com/",
            "https://www.youtube.com/shorts"
        ]);
    }
    let focusMode = await getSyncStorage("focusMode");
    if(focusMode == undefined){
        await setSyncStorage("focusMode", false);
    }
})();

chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab){
    let focusMode = await getSyncStorage("focusMode");
    if(focusMode == true){
    
        var blockedSites = await getSyncStorage("blockedSites");
        console.log(blockedSites);
        console.log("checking...");
        for(var i = 0; i < blockedSites.length; i++){
            if(tab.url.slice(0, blockedSites[i].length) == blockedSites[i]){
                // Checks if the first part of the page url is a blocked site
                chrome.tabs.update(tabId, {url: "chrome://newtab"});
            }
        }
    }
});