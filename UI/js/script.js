// responsive navbar styling
function navBar () {
  let nav = document.getElementById("topnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  };
};

// Side bar
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

// function classActive() {
//   let links = document.getElementsByClassName("links");
//   links.addEventlistener('click', function(){
//     links.classList.add("active");
//   })
// }

// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByClassName("group");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("DEL");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Create a "link" button and append it to each group list item
let myNodelist1 = document.getElementsByClassName("group");
let j;
for (j = 0; j < myNodelist1.length; j++) {
  let a = document.createElement("a");
  let txt1 = document.createTextNode("EDIT");
  a.className = "add";
  a.setAttribute("href", "addusers.html")
  a.appendChild(txt1);
  myNodelist1[j].appendChild(a);
}

// Create a "delete" button and append it to each user list item
let myNodelist2 = document.getElementsByClassName("user");
let x;
for (x = 0; x < myNodelist2.length; x++) {
  let span = document.createElement("span");
  let del = document.createTextNode("DEL");
  span.className = "close";
  span.appendChild(del);
  myNodelist2[x].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("DEL");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}