const productList = document.getElementsByClassName("product-list")[0];
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
var cartItems;

function myFunctionUser() {
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }
}

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

fetch("/product", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({}),
})
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      alert("Urun bulunmamaktadır.");
    } else {
      for (var i = 0; i < data.length; i++) {
        console.log(data[i]);
        /*
          const clonedDiv = productCard[i].cloneNode(true);
          clonedDiv.id = `product-card-${i}`;
          productList.appendChild(clonedDiv); */

        let myDiv = document.createElement("div");
        myDiv.className = "product-card";

        let myImageDiv = document.createElement("div");
        myImageDiv.className = "product-image-div";
        myDiv.appendChild(myImageDiv);

        let myImage = document.createElement("img");
        myImage.className = "product-image";
        myImage.src = "/images/" + data[i].image;
        myImageDiv.appendChild(myImage);

        let myDetail = document.createElement("div");
        myDetail.className = "product-details";
        myDiv.appendChild(myDetail);

        let myh2 = document.createElement("h2");
        myh2.className = "product-title";
        const myh2_text = document.createTextNode(data[i].name);
        myh2.appendChild(myh2_text);
        myDetail.appendChild(myh2);

        let myP = document.createElement("p");
        myP.className = "product-description";
        const myP_text = document.createTextNode(data[i].description);
        myP.appendChild(myP_text);
        myDetail.appendChild(myP);

        let myPrice = document.createElement("p");
        myPrice.className = "product-price";
        const myPrice_text = document.createTextNode(data[i].price + "$");
        myPrice.appendChild(myPrice_text);
        myDetail.appendChild(myPrice);

        var myButton = document.createElement("button");
        myButton.id = `productBtn-${i}`;
        const myButton_text = document.createTextNode("ADD to Cart");
        myButton.appendChild(myButton_text);
        myDetail.appendChild(myButton);
        productList.appendChild(myDiv);

        var buttons = document
          .getElementById(`productBtn-${i}`)
          .addEventListener("click", handleClick);

        // şimdi bak, üstte benim yaptığım gibi html ementleri oluşturup,
        // değerlerini verip öyle ekleyebilrsin
        // ya da, direkt senin yaptığın gibi html'de görünmez bir div oluşturursun
        // onu clone'larsın sonra değerlerini değiştirirsin.
        // nasıl kolayına gelirse o şekilde yaparsın. clone olmaz ddedin ya
        // olmaz demedim, olur. ama tahminimce daha zor olurdu ama şimdi yapınca belki daha kolay olur bilmiyom, hangisini tercih edersen ona göre yaparsın. tamam  zekiş tamm var mı başka bişiy şu anlık yok tamamdır ben kaçıyom see ya later ok by by
      }
    }

    function handleClick(event) {
      let buttonArr = [];
      let buttonId = event.target.id;
      buttonArr.push(buttonId.split("-"));
      let productId = buttonArr[0][1];
      let productIdd = data[productId]._id;

      cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
      let productExist = false;

      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].id === productIdd) {
          cartItems[i].adet++;
          productExist = true;
          alert("Urun sepete eklendi");
          break;
        }
      }
      if (!productExist) {
        cartItems.push({ id: productIdd, adet: 1 });
        alert("Urun sepete eklendi");
      }

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      /*   fetch("/productCheck",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              id: data[productId]._id,
            })
          })
          .then((response) => response.json())
          .then((data) => {
            if(data.yonlendir != undefined) window.location.replace(data.yonlendir);
            console.log(data);
            let message = JSON.stringify(data, ['message'])
            const mes = message.split(".");
            let word = mes[0];
            alert(word);
          })
          .catch((error) => {
            console.error("Error:", error);
          }); */
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });

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
