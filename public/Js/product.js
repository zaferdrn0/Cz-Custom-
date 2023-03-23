const productCard = document.getElementsByClassName("product-card");
const productTitle = document.getElementsByClassName("product-title");
const productDescription = document.getElementsByClassName("product-description");
const productPrice = document.getElementsByClassName("prodcut-price");
const productList = document.getElementsByClassName("product-list")


fetch("/product", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for(var i=0; i<data.length; i++) {
        const clonedDiv = productCard[i].cloneNode(true);
        clonedDiv.id = `product-card-${i}`;
        document.body.appendChild(clonedDiv);

        

      } 
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
  
