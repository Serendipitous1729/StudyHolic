// var focusModeToggle = document.getElementById("focus-mode-toggle");
// function getFocusMode(){
//     chrome.storage.sync.get(["focusMode"]).then(function(result){
//         console.log(result.focusMode);
//         return result.focusMode;
//     });
// }
// function setFocusMode(focusModeState){
//     // focusModeState = "active"/"inactive"
//     // Setting focusModeState to a boolean value didn't work, so we set it to a string
//     chrome.storage.sync.set({"focusMode": focusModeState}).then(function(){
//         console.log("Set focus mode to: " + getFocusMode());
//     });
// }
// function updateFocusToggleState(focusModeState){
//     if(focusModeState == "active"){
//         focusModeToggle.checked = true;
//     }else if(focusModeState == "inactive"){
//         focusModeToggle.checked = false;
//     }
// }

// if(getFocusMode() == undefined){
//     setFocusMode("active");
// }
// updateFocusToggleState(getFocusMode());

// focusModeToggle.addEventListener("click", function(){
//     setFocusMode(focusModeToggle.checked ? "active" : "inactive");
//     // console.log(getFocusMode());
// });

// The toggle switch's checkbox
var focusModeToggle = document.getElementById("focus-mode-toggle");

// Functions to get and set the focus mode and store it in synced storage
// (It's synced so the settings can be the same on other devices too)
async function getFocusMode(){
    return new Promise((resolve) => {
        chrome.storage.sync.get(["focusMode"], (result) => {
            resolve(result.focusMode);
        });
    });
}
async function setFocusMode(focusModeState){
    chrome.storage.sync.set({"focusMode": focusModeState});
    // console.log("Set focus mode to: " + focusModeState); <-- Uncomment for debugging purposes
}

async function updateFocusToggleState(focusModeState){
    focusModeToggle.checked = focusModeState;
}

(async () => {
    let focusMode = await getFocusMode();
    updateFocusToggleState(focusMode);
    focusModeToggle.addEventListener("click", async () => {
        await setFocusMode(focusModeToggle.checked);
        updateFocusToggleState(focusModeToggle.checked);
    });
})();