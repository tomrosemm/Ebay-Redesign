// JavaScript Document

function goToPage2() {
  // Get the selected option
  var selectElement = document.getElementById("mySelect");
  var selectedOption = selectElement.options[selectElement.selectedIndex].value;

  // If an option is selected (not the placeholder), store it and go to Page 2
  if (selectedOption) {
      // Store the selected option in local storage
      localStorage.setItem("selectedOption", selectedOption);

      // Redirect
      window.location.href = "categories.html";
  }
}

function openStar(evt, starNum) {
    // Declare all variables
    var i, tabcontent, tablinks;
  
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(starNum).style.display = "block";
    evt.currentTarget.className += " active";
  }

var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}