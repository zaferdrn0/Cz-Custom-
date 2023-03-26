let links = document.getElementById("myLinks");
let cikisYap = document.getElementById("cikisYap");
let userMenu = document.getElementById("user-menu");
let loginUser = document.getElementById("login-user");
let cikisUser = document.getElementById("cikisYap-user");
let userLink = document.getElementById("user-link");
let cartLink = document.getElementById("cart-link");
let y = document.getElementById("user-menu");
let userPanel = document.getElementById("user-panel")
let adminProductAdd = document.getElementById("admin-product-add")
const productList = document.getElementsByClassName("cart-products")[0]


function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  };

  function myFunctionUser(){
   
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
       if(data.data === "kullanıcıVar" ){
         
          userPanel.style.display = "block";
          loginUser.style.display = "none";

          if(data.admin === "1"){
            adminProductAdd.style.display ="block";
          }

        }
         
        
      })
      .catch(function (err) {
        console.log("Fetch Error :-S", err);
      });
  
      











var cartItems = localStorage.getItem("cartItems");
let cartt = JSON.parse(cartItems)



fetch("/cart",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({
      cartItems: cartt
      
    })
  })
  .then((response) => response.json())
  .then((data) => {

  
    for(var i=0; i<data.length; i++) {
      console.log(data[i]);

      let myDiv = document.createElement("div");
      myDiv.className = "products-list";
      productList.appendChild(myDiv)

      let myImageDiv = document.createElement('div')
      myImageDiv.className = "image-div";
      myDiv.appendChild(myImageDiv)

      let myImage = document.createElement('img')
      myImage.className = "image";
      myImage.src = "/images/"+data[i].image;
      myImageDiv.appendChild(myImage)

      let myh2Div = document.createElement('div');
          myh2Div.className ="title-div";
          myDiv.appendChild(myh2Div);

          let myh2 = document.createElement('h2');
          myh2.className ="title";
          const myh2_text = document.createTextNode(data[i].name);
          myh2.appendChild(myh2_text);
          myh2Div.appendChild(myh2);

          let myCountDiv = document.createElement("div");
          myCountDiv.className = "count-div";
          myDiv.appendChild(myCountDiv);

          let myCount = document.createElement("input")
          myCount.type ="text";
          myCount.name ="quantity[15085]";
          myCount.size ="1";
          myCount.value = data[i].adet;
          myCountDiv.appendChild(myCount);


          let myPriceDiv = document.createElement('div');
          myPriceDiv.className ="price-div";
          myDiv.appendChild(myPriceDiv);

          let myPrice = document.createElement('p');
          myPrice.className ="price";
          const myPrice_text = document.createTextNode(data[i].price + "$");
          myPrice.appendChild(myPrice_text);
          myPriceDiv.appendChild(myPrice);

          let myTutarDiv = document.createElement('div');
          myTutarDiv.className ="all-price-div";
          myDiv.appendChild(myTutarDiv);

          let myTutar = document.createElement('p');
          myTutar.className ="all-price";
          const myTutar_text = document.createTextNode(data[i].adet *data[i].price + "$" );
          myTutar.appendChild(myTutar_text);
          myTutarDiv.appendChild(myTutar);
    }

  })
  .catch((error) => {
    console.error("Error:", error);
  }); 