// Script for side navigation
function w3_open() {
  var x = document.getElementById("mySidebar");
  x.style.fontFamily="Orbitron-Regular";
  x.style.width = "250px";
  x.style.paddingTop = "15%";
  x.style.display = "block";
}

// Close side navigation
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  x.style.paddingTop = "15%";
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}
/*-----------------------------------------------------------------------------------------*/