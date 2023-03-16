const email = document.getElementById("email");
const sifre = document.getElementById("sifre");


function GirisYap(){

    fetch("/loginn", {
      method: "POST", // or 'PUT'
      headers: {'Content-Type': 'application/json'},
      redirect: 'follow',
      reffererPolicy: 'no-referrer',
      body: JSON.stringify({
        email: email.value,
        password: sifre.value
      }),
    })
    .then(response => {
        if (response.status == 200){
          window.location.replace("/index.html");
        } else if (response.status == 400) {
          response.json().then(res => {console.log(res.hata);})
        }
      })
    
  }
  