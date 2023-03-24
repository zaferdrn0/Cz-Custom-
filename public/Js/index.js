let links = document.getElementById("myLinks");
let cikisYap = document.getElementById("cikisYap");

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

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
  

