// Homepage time
var time = document.querySelector("#time");
var date = document.querySelector("#date");
const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function padZero(number){
    var stringifiedNumber = number + "";
    if(stringifiedNumber.length == 1){
        return "0"+stringifiedNumber;
    }else{
        return stringifiedNumber;
    }
}
          
window.setInterval(function(){
    var today = new Date();
    time.innerText = padZero(today.getHours()) + ":" + padZero(today.getMinutes()) + ":" + padZero(today.getSeconds());
    date.innerText = padZero(today.getDate()) + " " + monthsOfTheYear[today.getMonth()] + ", " + daysOfTheWeek[today.getDay()];
    // Updated more frequently than once a second to ensure that (almost) accurate time is displayed 
}, 10);

// To-do list

var button      = document.querySelector("button"),
    input       = document.querySelector("input"),
    ul          = document.querySelector("ul"),
    listItems   = document.querySelectorAll(".todo-li");


listItems.forEach(removeOnClick);
button.addEventListener("click", addToListOnClick);
input.addEventListener("keypress", addToListOnEnter)

function inputLength (){
    return input.value.length;
}
function clearInput (){
    input.value = "";
}

function addElementToList() {
    var li = document.createElement("li");
    li.setAttribute("class", "todo-li");
    li.innerText = input.value;
    removeOnClick(li);
    ul.appendChild(li);
    clearInput();
}

function addToListOnClick () {
    if (inputLength() > 0){
        addElementToList();
    }
}

function addToListOnEnter(){
    if(inputLength() > 0 && event.keyCode === 13){
        addElementToList();
    }
}

function removeOnClick(li){
    li.addEventListener("click", function(){
        this.remove();
    });
}

//--------------------
document.querySelector("#add-fav").addEventListener("click", function () {
    var weblink = prompt("Enter the link:");
    var webname = prompt("What is the sites name:");
    addFavourite(weblink, webname);
});

function addFavourite(weblink, webname){
    var newElement = document.createElement("li");
    newElement.innerHTML = "<a class='favourite-icon' href=" + weblink + " target = '_blank'><img class='favicon-img' src="+"https://s2.googleusercontent.com/s2/favicons?domain_url="+weblink+"><span class='links_name'>" + webname + "</span></a><span class='tooltip'>" + webname + "</span>";
    // TODO: Get better icons
    document.querySelector("ul.nav-list").prepend(newElement);
}
var favourites = [
    {name: "Gmail", href: "https://mail.google.com/mail/u/0/#inbox"},
    {name: "YouTube", href: "https://www.youtube.com"},
];
for(var i = 0; i < favourites.length; i++){
    addFavourite(favourites[i].href, favourites[i].name);
}



let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#favourites-btn");
closeBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    menuBtnChange();
});

// console.log(chrome); this comment is to honour the line that saved this project and my sanity


function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
        closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
        closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
}