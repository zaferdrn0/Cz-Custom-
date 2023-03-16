let username = document.getElementById('KullaniciAdi');
let email = document.getElementById('email');
let sifre = document.getElementById('sifre');



function kayıtOl(){
  

  fetch("/register", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    redirect: 'follow',
    reffererPolicy: 'no-referrer',
    
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      sifre: sifre.value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  
}


  

