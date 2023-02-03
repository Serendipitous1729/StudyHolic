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
var blockYoutube = true;
// const youtubeBlockedSites = [
//     "https://www.youtube.com/channel/UC-9-kyTW8ZkZNDHQJ6FgpwQ",
//     "https://www.youtube.com/channel/UC4R8DWoMoI7CAwX8_LjQHig",
//     "https://www.youtube.com/gaming",
//     "https://www.youtube.com/channel/UCYfdidRxbB8Qhf0Nx7ioOYw",
//     "https://www.youtube.com/channel/UCEgdi0XIXXZ-qJOFPf4JSKw",
//     "https://www.youtube.com/channel/UCrpQ4p1Ql_hG8rKXIKM1MOQ"
// ];
(async function(){
    var blockedSites = await getSyncStorage("blockedSites");
    if(blockedSites == undefined){
        await setSyncStorage("blockedSites", [
            "https://www.facebook.com/",
            "https://twitter.com/",
            "https://www.instagram.com/",
            "https://web.snapchat.com/"
        ]);
    }
    let focusMode = await getSyncStorage("focusMode");
    if(focusMode == undefined){
        await setSyncStorage("focusMode", false);
    }

    let favourites = await getSyncStorage("favourites");
    if(favourites == undefined){
        await setSyncStorage("favourites", [
            { name: "Google Search", href: "https://www.google.com/"},
            { name: "Gmail", href: "https://mail.google.com/mail/u/0/#inbox"},
            { name: "YouTube", href: "https://www.youtube.com" },
            { name: "Discord", href: "https://www.discord.com" }
        ]);
    }
    let todoEntries = await getSyncStorage("todoEntries");
    if(todoEntries == undefined){
        await setSyncStorage("todoEntries", ["Add your pending tasks here!"]);
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
        // Check YouTube sites
        if(blockYoutube && tab.url.slice(0, 24) == "https://www.youtube.com/"){
            // for(var i = 0; i < youtubeBlockedSites.length; i++){
            //     if(tab.url.slice(0, youtubeBlockedSites[i].length) == youtubeBlockedSites[i]){
            //         // Checks if the first part of the page url is a blocked site
            //         chrome.tabs.update(tabId, {url: "chrome://newtab"});
            //     }
            // }
            var validUrlBeginnings = ["https://www.youtube.com/watch?v=", "https://www.youtube.com/playlist?list=", "https://www.youtube.com/results?search_query="];
            
            var isOnValidYTSite = false;
            for(var i = 0; i < validUrlBeginnings.length; i++){
                if(tab.url.slice(0, validUrlBeginnings[i].length) == validUrlBeginnings[i]){
                    isOnValidYTSite = true;
                }
            }
            if(!isOnValidYTSite){
                chrome.tabs.update(tabId, {url: "https://www.youtube.com/results?search_query="});
            }
        }
    }
});