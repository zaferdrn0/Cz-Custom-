const title = document.getElementById("productTitle");
const label = document.getElementById("productLabel");
const image = document.getElementById("productImage");
const type = document.getElementById("productType");
const price = document.getElementById("productPrice");
const typeAddInput = document.getElementById("typeAddInput");
let cikisYap = document.getElementById("cikisYap");
let userMenu = document.getElementById("user-menu");
let loginUser = document.getElementById("login-user");
let cikisUser = document.getElementById("cikisYap-user");
let y = document.getElementById("user-menu");
let userPanel = document.getElementById("user-panel");

let links = document.getElementById("myLinks");
let adminProductAdd = document.getElementById("admin-product-add");

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function productAdd() {
  let path = image.value;
  let uzantı = path.split("\\");
  let images = uzantı[2];

  fetch("/productAdd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      label: label.value,
      image: images,
      type: type.value,
      price: price.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.yonlendir != undefined) window.location.replace(data.yonlendir);
      console.log(data);
      let message = JSON.stringify(data, ["message"]);
      const mes = message.split(".");
      let word = mes[1];
      alert(word);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function typeAdd() {
  fetch("/typeAdd", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: typeAddInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.yonlendir != undefined) window.location.replace(data.yonlendir);
      console.log(data);
      let message = JSON.stringify(data, ["message"]);
      const mes = message.split(".");
      let word = mes[1];
      alert(word);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

fetch("/getType", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let opt = document.createElement("option");
    opt.innerHTML = "Lütfen Type seciniz";
    opt.style.disabled = true;
    type.appendChild(opt);
    for (var i = 0; i < data.length; i++) {
      var option = document.createElement("option", data[i]);
      option.innerText = data[i];
      type.appendChild(option);
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

/* let test = document.createElement('option');
test.value = "blablaba"
document.getElementById('selectSeyim').appendChild(test);
 */

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
