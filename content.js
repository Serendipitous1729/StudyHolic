window.addEventListener("load", function(){

  // so far, the best method to replace stuff on page is to wait manually for a while, due to issues with loading

  if(location.href == "https://www.youtube.com/results?search_query="){
      this.setTimeout(function(){
        document.querySelector("div.promo-title.style-scope.ytd-background-promo-renderer").innerText = "You're doing a great job. Keep it up!";
        document.querySelector("yt-formatted-string.promo-body-text.style-scope.ytd-background-promo-renderer").innerText = "Focus mode is turned on, so some features of YouTube are disabled.";
      }, 100);
  }
  if(location.href.slice(0, 32) == "https://www.youtube.com/watch?v="){
      this.setTimeout(function(){
        document.querySelector("#secondary").innerHTML = "";
      }, 2000);
  }
});