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
const productList = document.getElementById("table-body")

var dataId 

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
      dataId = data[i].id;

      let mytr = document.createElement("tr");
      productList.appendChild(mytr)

      let myImageTd = document.createElement("td");
      mytr.appendChild(myImageTd);

      let myImage = document.createElement("img");
      myImage.src = "/images/"+data[i].image;
      myImageTd.appendChild(myImage);

      
      let myTitleTd = document.createElement("td")
      const myTitleTd_text = document.createTextNode(data[i].name);
      myTitleTd.appendChild(myTitleTd_text);
      mytr.appendChild(myTitleTd);

      let myInputTd = document.createElement("td");
      mytr.appendChild(myInputTd);

      let myInput = document.createElement("input");
      myInput.type = "number";
      myInput.min = "1";
      myInput.value = data[i].adet;
      myInputTd.appendChild(myInput);

      let myPriceTd = document.createElement("td");
      const myPriceTd_text = document.createTextNode(data[i].price + "$")
      myPriceTd.appendChild(myPriceTd_text);
      mytr.appendChild(myPriceTd);

      let myAllPriceTd = document.createElement("td");
      const myAllPriceTd_Text = document.createTextNode(myInput.value *data[i].price + "$")
      myAllPriceTd.appendChild(myAllPriceTd_Text);
      mytr.appendChild(myAllPriceTd);

      let myDeleteTd = document.createElement("td");
      mytr.appendChild(myDeleteTd);

      let myDeleteIcone = document.createElement("i")
      myDeleteIcone.className = "fa-solid fa-trash";
     myDeleteIcone.style.cursor ="pointer"
      myDeleteIcone.onclick = function() {
        
      var myListData = localStorage.getItem("cartItems");
        

      var myListArray = myListData.split(",");
        console.log(dataId)

      var index = myListArray.indexOf(dataId);

      if(index >= 0) {
          myListArray.splice(index, 1);
           var updatedList = myListArray.join(",");
           localStorage.setItem("cartItems", updatedList);
            }
          };
      myDeleteTd.appendChild(myDeleteIcone)

     
        
      
    } 

  })
  .catch((error) => {
    console.error("Error:", error);
  }); 


