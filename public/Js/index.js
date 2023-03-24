let links = document.getElementById("myLinks");
let cikisYap = document.getElementById("cikisYap");
let userMenu = document.getElementById("user-menu")

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  };

  function myFunctionUser(){
    var y = document.getElementById("user-menu");
    if (y.style.display === "block") {
      y.style.display = "none";
    } else {
      y.style.display = "block";
    }

  }
 
  

  function cikisYapp(){
    
      fetch("/cikisYapp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if(data.yonlendir != undefined) window.location.replace(data.yonlendir);
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
        });
    
      return false;
    }
  

