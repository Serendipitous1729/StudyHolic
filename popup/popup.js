// The toggle switch's checkbox
var focusModeToggle = document.getElementById("focus-mode-toggle");

var blockedSitesContainer = document.getElementById("blocked-sites");



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

async function updateFocusToggleState(focusModeState){
    focusModeToggle.checked = focusModeState;
}

(async () => {
    if(focusModeToggle){
        let focusMode = await getSyncStorage("focusMode");
        updateFocusToggleState(focusMode);
        focusModeToggle.addEventListener("click", async () => {
            await setSyncStorage("focusMode", focusModeToggle.checked);
            updateFocusToggleState(focusModeToggle.checked);
        });
    }
    if(blockedSitesContainer){
        let blockedSites = await getSyncStorage("blockedSites");
        for(var i = 0; i < blockedSites.length; i++){
            var site = document.createElement("div");
            site.innerHTML = "<a href="+blockedSites[i]+" class='menu-option-text blocked-site'>"+blockedSites[i]+"<span id="+i+" class='delete-blocked-site'>[Delete]</span></a>";
            blockedSitesContainer.append(site);
        }
        document.querySelectorAll(".delete-blocked-site").forEach(async function(el){
            el.addEventListener("click", async function(){
                var shouldDel = confirm("Are you sure you want to delete\n'" + el.parentElement.getAttribute("href") + "' from the sites blocked by focus mode?");
                if(shouldDel){
                    let blockedSites = await getSyncStorage("blockedSites");
                    blockedSites.splice(this.getAttribute("id"), 1);
                    await setSyncStorage("blockedSites", blockedSites);
                    window.location.reload();
                }
            });
        });
        document.querySelector("#add-site").addEventListener("click", async function(){
            let blockedSites = await getSyncStorage("blockedSites");
            var weblink = prompt("Paste the site's URL here:");

            if((weblink.slice(0, 8) == "https://" || weblink.slice(0, 7) == "http://") && weblink.trim().length > 0){
                blockedSites.push(weblink);
                await setSyncStorage("blockedSites", blockedSites);
                window.location.reload();
            }
        });
    }
})();

