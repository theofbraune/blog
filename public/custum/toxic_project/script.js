var imageLink = document.getElementById("image-link");
var waitingScreen = document.getElementById("waiting-screen");
var loader = document.querySelector(".loader");

imageLink.addEventListener("click", function(event) {
    event.preventDefault();
    waitingScreen.style.display = "block";
  
    setTimeout(function() {
      loader.style.animation = "none";
      loader.style.border = "10px solid #ff0000";
      var errorBox = document.createElement("div");
      errorBox.classList.add("error-box");
      errorBox.innerHTML = "<p>Une erreur technique est survenue.<br> ErrorCode43926.<br> Veuillez réessayer ultérieurement.</p>";
      waitingScreen.appendChild(errorBox);
  
      // Add a click event listener to the error box
      errorBox.addEventListener("click", function() {
        location.reload();
      });
    }, 10000); 
  });
