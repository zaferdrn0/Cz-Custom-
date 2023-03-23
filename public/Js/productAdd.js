const title = document.getElementById("productTitle");
const label = document.getElementById("productLabel");
const image = document.getElementById("productImage");
const type = document.getElementById("productType");
const price = document.getElementById("productPrice");
const typeAddInput = document.getElementById("typeAddInput");





 


let links = document.getElementById("myLinks");

function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };









function productAdd(){

  let path = image.value;
  let uzantı= path.split("\\");
  let images = uzantı[2]

  // mantık hatası yapmışsın yani xd bu dosya yolu tam gelmiyo pathfela yazıyo . dökümantasyonda yazıoy bak e tamam da veritabanı bunu anlıcakmı dosya yolunu
  // onu sen ayarlıcan ben oraısnı bilmem. araştır öğren xd teknik yerlerde takıldığında yazarsın bana __dirname getirsek önune kaydederken pathda
  // ben bilmem, mantığı, dizaynı sen kurcan. ben sadece niye çalışmıyo,a gibimsi şeylere yardım ederim path ve öncesini kesip __dirname yapsak
  // amacın ne bilmiyorum bu dosya adını gelirken, ne yapacağını da bilmiyorum bu dosya adıyla. benle bir alakası da yok. dediğim gibi,
  // dizayn işi senin işin. bu dosya veritabanında yolu tutulcak işte sonra o yolu yazdırcam img tagına html de html
  // path vermiyo bu, sadece dosya isimini veriyo. ne yapcam. bilmiyom sen düşün onu. hepsini mesela ne bileyim /resimler klasorune koyarsın. sonra
  // html image takında /resimler/resimAdı gibi bir şey yapabilrisn belki bilmiyom. onu sen bulcan tamam ben anladım işi yapmaya başlıyom bide şey var bu option var ya listeleme ona veritabanından verileri cekip option olarak yazdırmam lazım. option dediğin ne oluyo
  // for dongusuyla eklicen içine optionları.tamam 

  // boyle bisi yapcan sanırım bunu for dögüsüne sokabilirsin. tam emin değilim koddan da boyle bisiydi galiba. ben kaçıyom var mı başka bişi yok cok saol tm görş by by

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
          price: price.value
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if(data.yonlendir != undefined) window.location.replace(data.yonlendir);
          console.log(data);
          let message = JSON.stringify(data, ['message'])
          const mes = message.split(".");
          let word = mes[1];
          alert(word);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
};



function typeAdd(){

  fetch("/typeAdd", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:typeAddInput.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if(data.yonlendir != undefined) window.location.replace(data.yonlendir);
      console.log(data);
      let message = JSON.stringify(data, ['message'])
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
  body: JSON.stringify({
  }),
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let opt = document.createElement('option');
    opt.innerHTML = "Lütfen Type seciniz";
    opt.style.disabled = true;
     type.appendChild(opt);
    for(var i=0; i<data.length; i++) {
     
     var option = document.createElement("option",data[i]);
     option.innerText = data[i]
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