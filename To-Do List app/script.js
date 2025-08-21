const button = document.querySelector("#submit");
const para = document.querySelector("p");
const input = document.querySelector("#text");
const list = document.querySelector("ul");

window.addEventListener("DOMContentLoaded", loadTasks);

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("ul li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains("checked")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach(task => {
        const listItem = document.createElement("li");
        const t = document.createTextNode(task.text);
        listItem.appendChild(t);
        if (task.checked) {
            listItem.classList.add("checked");
        }
        addClosebtn(listItem);
        list.appendChild(listItem);
    });
}

// add task when clicked on add task button
function newElement(){
    const task = input.value.trim();
    if (task === ""){
        alert("You Must Write Something!")
        return;
    }
    const listItem = document.createElement("li");
    const t = document.createTextNode(task);
    listItem.appendChild(t);
    addClosebtn(listItem);
    list.appendChild(listItem);
    saveTasks(); // Save after adding
    input.value = "";
    input.focus();
    
}
button.addEventListener("click", newElement);

// add a close button to one list item
function addClosebtn(li){
    const span = document.createElement("SPAN");
    const txt = document.createTextNode("\u00D7")
    span.className = "close";
    span.appendChild(txt);
    span.addEventListener("click",function(e){
        e.stopPropagation();
        li.remove();
        saveTasks(); // Save after adding
     });
    li.appendChild(span);
    }
        

// // add close buttons to existing li's on page load
// const myNodeList = document.getElementsByTagName("LI");
// for (let i=0; i<myNodeList.length; i++){
//     addClosebtn(myNodeList[i]);
// }

const lst = document.querySelector("#myUL");
lst.addEventListener("click",function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle('checked');
        saveTasks(); // Save after adding
    }
},false);

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        newElement();
    }
});




