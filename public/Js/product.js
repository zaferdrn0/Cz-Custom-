const productCard = document.getElementsByClassName("product-card");
const productTitle = document.getElementsByClassName("product-title");
const productDescription = document.getElementsByClassName("product-description");
const productPrice = document.getElementsByClassName("prodcut-price");
const productList = document.getElementsByClassName("product-list")[0]

let links = document.getElementById("myLinks");
 // olmaz, öyle bi fonksiyon yok. çünkü id, tek bir elemana özeldir
 // sınıf ise birden fazla olabilir. tamma şimdi verileri nasıl yazdırıcaz hepsine aynı veri gidi


 



function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };




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
      if(data.length === 0){
        alert("Urun bulunmamaktadır.")
      }
      else{
        for(var i=0; i<data.length; i++) {
          console.log(data[i])
          /*
          const clonedDiv = productCard[i].cloneNode(true);
          clonedDiv.id = `product-card-${i}`;
          productList.appendChild(clonedDiv); */
      
          let myDiv = document.createElement('div');
          myDiv.className = "product-card";
  
          let myImageDiv = document.createElement('div');
          myImageDiv.className ="product-image-div";
          myDiv.appendChild(myImageDiv);

          let myImage = document.createElement('img');
          myImage.className ="product-image";
          myImage.src ="/images/"+data[i].image;
          myImageDiv.appendChild(myImage);
          

          let myDetail = document.createElement("div");
          myDetail.className = "product-details";
          myDiv.appendChild(myDetail);
  
          let myh2 = document.createElement('h2');
          myh2.className ="product-title";
          const myh2_text = document.createTextNode(data[i].name);
          myh2.appendChild(myh2_text);
          myDetail.appendChild(myh2);
  
          let myP = document.createElement('p');
          myP.className ="product-description";
          const myP_text = document.createTextNode(data[i].description);
          myP.appendChild(myP_text);
          myDetail.appendChild(myP);
        
          let myPrice = document.createElement('p');
          myPrice.className ="product-price";
          const myPrice_text = document.createTextNode(data[i].price + "$");
          myPrice.appendChild(myPrice_text);
          myDetail.appendChild(myPrice);

          var myButton = document.createElement('button')
          myButton.id = `productBtn-${i}`;
          const myButton_text = document.createTextNode("ADD to Cart");
          myButton.appendChild(myButton_text);
          myDetail.appendChild(myButton);
          productList.appendChild(myDiv);
        
          
          document.getElementById(`productBtn-${i}`).addEventListener("click", benimFonksiyonum);
      
        

          
  
          // şimdi bak, üstte benim yaptığım gibi html ementleri oluşturup,
          // değerlerini verip öyle ekleyebilrsin
          // ya da, direkt senin yaptığın gibi html'de görünmez bir div oluşturursun
          // onu clone'larsın sonra değerlerini değiştirirsin.
          // nasıl kolayına gelirse o şekilde yaparsın. clone olmaz ddedin ya
          // olmaz demedim, olur. ama tahminimce daha zor olurdu ama şimdi yapınca belki daha kolay olur bilmiyom, hangisini tercih edersen ona göre yaparsın. tamam  zekiş tamm var mı başka bişiy şu anlık yok tamamdır ben kaçıyom see ya later ok by by
        
        } 
        
      }
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  

    function benimFonksiyonum(){
     
      fetch("/productCheck")
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
      });
    }