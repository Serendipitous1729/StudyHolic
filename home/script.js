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





setInterval(() => {
    const time = document.querySelector("#time");
    let date = new Date();
    let hours = padZero(date.getHours());
    let minutes = padZero(date.getMinutes());
    let seconds = padZero(date.getSeconds());
    time.textContent = hours + ":" + minutes + ":" + seconds;
});

function padZero(number) {
    var stringifiedNumber = number + "";
    if (stringifiedNumber.length == 1) {
        return "0" + stringifiedNumber;
    } else {
        return stringifiedNumber;
    }
}
var date = document.querySelector("#date");

const daysOfTheWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthsOfTheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

window.setInterval(function() {
    var today = new Date();
    date.innerText = padZero(today.getDate()) + " " + monthsOfTheYear[today.getMonth()] + ", " + daysOfTheWeek[today.getDay()];
}, 10);



var button = document.querySelector("#todo-btn"),
input = document.querySelector("#add-task"),
dateInput = document.querySelector("#duedate"),
ul = document.querySelector("ul"),
listItems = document.querySelectorAll(".todo-li"),
todoOpenBtn = document.querySelector("#todo-open"),
todoCloseBtn = document.querySelector("#todo-close");

/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("todo-list-container").style.right = "10px";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
    document.getElementById("todo-list-container").style.right = "-450px";
}

todoOpenBtn.addEventListener("click", function(){
    openNav();
});
todoCloseBtn.addEventListener("click", function(){
    closeNav();
});

var today = new Date();
dateInput.setAttribute("value",
                     today.getFullYear() +
                     "-" +
                     padZero(today.getMonth()+1) + 
                     "-" +
                     padZero(today.getDate()));
dateInput.setAttribute("min",
                     today.getFullYear() +
                     "-" +
                     padZero(today.getMonth()+1) + 
                     "-" +
                     padZero(today.getDate()));
dateInput.addEventListener('keydown', function (event) {
event.preventDefault()
})



listItems.forEach(removeOnClick);
button.addEventListener("click", addToListOnClick);
input.addEventListener("keypress", addToListOnEnter)

function inputLength() {
    return input.value.length;
}
function clearInput() {
    input.value = "";
}
function createTodoListEntry(task, submitDate){

    var nowDate = new Date();
    var subDay = submitDate.slice(8, 10);
    var subMonth = submitDate.slice(5, 7) - 1;
    var subYear = submitDate.slice(0, 4);
    var hwDate = new Date();
    hwDate.setFullYear(subYear, subMonth, subDay);
    var daysLeft = (hwDate - nowDate)/(24*60*60*1000);
    daysLeft = daysLeft.toFixed(0);

    if(daysLeft == 0){
        return task + ", due today";
    }else if(daysLeft == 1){
        return task + ", due tomorrow";
    }else{
        return task + ", due in " + daysLeft + " days";
    }
}
async function addElementToList(listEntry, id) {
    var li = document.createElement("li");
    li.setAttribute("class", "todo-li");
    
    li.setAttribute("id", id)

    li.innerText = listEntry;
    removeOnClick(li);
    ul.prepend(li);
    clearInput();
}

async function addToListOnClick() {
    if (inputLength() > 0) {
        let todoEntries = await getSyncStorage("todoEntries");
        let listEntry = createTodoListEntry(input.value, dateInput.value);
        await addElementToList(listEntry, todoEntries.length);
        todoEntries.push(listEntry);
        await setSyncStorage("todoEntries", todoEntries);
    }
}

async function addToListOnEnter() {
    if (inputLength() > 0 && event.keyCode === 13) {
        let todoEntries = await getSyncStorage("todoEntries");
        let listEntry = createTodoListEntry(input.value, dateInput.value);
        await addElementToList(listEntry, todoEntries.length);
        todoEntries.push(listEntry);
        await setSyncStorage("todoEntries", todoEntries);
    }
}

function removeOnClick(li) {
    li.addEventListener("click", async function() {
        var toDelete = confirm("Are you sure you want to remove the item\n'"+this.innerText+"'?");
        if(toDelete){
            var todoListEntries = await getSyncStorage("todoEntries");
            todoListEntries.splice(this.getAttribute("id"), 1);
            await setSyncStorage("todoEntries", todoListEntries);
            this.remove();
        }
    });
}
async function loadTodoList(){
    let todoEntries = await getSyncStorage("todoEntries");
    for(var i = 0; i < todoEntries.length; i++){
        addElementToList(todoEntries[i], i);
    }
}
loadTodoList();

//--------------------
document.querySelector("#add-fav").addEventListener("click", async function() {
    var weblink = prompt("Enter the link:");
    var webname = prompt("What is the sites name:");
    let favourites = await getSyncStorage("favourites");
    favourites.push({ name: webname, href: weblink});
    await setSyncStorage("favourites", favourites);
    addFavourite(weblink, webname);
});

function addFavourite(weblink, webname) {
    var newElement = document.createElement("li");
    newElement.innerHTML = "<a class='favourite-icon' href=" + weblink + " target = '_blank'><img class='favicon-img' src=" + "https://s2.googleusercontent.com/s2/favicons?domain_url=" + weblink + "><span class='links_name'>" + webname + "</span></a><span class='tooltip'>" + webname + "</span>";
    // TODO: Get better icons
    document.querySelector("ul.nav-list").prepend(newElement);
}

async function loadFavourites(){
    let favourites = await getSyncStorage("favourites");
    for (var i = 0; i < favourites.length; i++) {
        addFavourite(favourites[i].href, favourites[i].name);
    }
}

loadFavourites();

// console.log(chrome); this comment is to honour the line that saved this project and my sanity