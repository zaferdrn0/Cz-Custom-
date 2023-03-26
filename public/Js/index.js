let links = document.getElementById("myLinks");
let cikisYap = document.getElementById("cikisYap");
let userMenu = document.getElementById("user-menu");
let loginUser = document.getElementById("login-user");
let cikisUser = document.getElementById("cikisYap-user");
let userLink = document.getElementById("user-link");
let cartLink = document.getElementById("cart-link");
let y = document.getElementById("user-menu");
let userPanel = document.getElementById("user-panel");
let adminProductAdd = document.getElementById("admin-product-add");

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function myFunctionUser() {
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }
}

function cikisYapp() {
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
      if (data.yonlendir != undefined) window.location.replace(data.yonlendir);
    })
    .catch(function (err) {
      console.log("Fetch Error :-S", err);
    });

  return false;
}

fetch("/loginCheck", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    if (data.data === "kullanıcıVar") {
      userPanel.style.display = "block";
      loginUser.style.display = "none";

      if (data.admin === "1") {
        adminProductAdd.style.display = "block";
      }
    }
  })
  .catch(function (err) {
    console.log("Fetch Error :-S", err);
  });
