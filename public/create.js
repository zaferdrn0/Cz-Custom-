let username = document.getElementById('KullaniciAdi');
let email = document.getElementById('email');
let sifre = document.getElementById('sifre');



function kayıtOl(){

  fetch("/register", {
    method: "POST", // or 'PUT'
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    reffererPolicy: 'no-referrer',
    body: JSON.stringify({
      username: username.value,
      email: email.value,
      password: sifre.value
    }),
  })
    .then(response => {
      if (response.status == 200){
        window.location.replace("/login.html");
      } else if (response.status == 400) {
        response.json().then(res => {console.log(res.hata);})
      }
    })
  
}


  

