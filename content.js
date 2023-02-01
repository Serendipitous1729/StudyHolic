chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request.url);
    console.log(request.url.slice(0, 23));
    if(request.url.slice(0, 23) == "https://www.youtube.com"){
      alert("You're currently in focus mode, so you won't get any youtube recommendations.");
      var elementsToDelete = ["#contents", "#chips-wrapper", "#items", "#contentContainer", "#items.style-scope.ytd-mini-guide-renderer", "#rendering-content"];
      window.setInterval(function(){
        for(var i = 0; i < elementsToDelete.length; i++){
          try{
            document.querySelector(elementsToDelete[i]).innerHTML = "";
          }catch(e){
            // This element doesn't exist on this page. Don't worry.
          }
        }
      }, 100)
    }
  }
);
