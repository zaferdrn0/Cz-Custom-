const express = require("express");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const app = express();
var path = require("path");
const port = 3000;
const serviceAccount = require("./cz-custom-firebase-adminsdk-t3g7q-073c9dce51.json");

app.use(express.static("public"));
app.use(require("body-parser").json()); // tamamadır. bu satın çözdü sorunu. otomatik olarak express gelen fetch isteğini normal string olarak almaya
// çalışıyordu sanırım. şimdi gelen req.body'i json olarak alıyor. tamam şidmi şey yapmcam eger kayıt ederse giriş sayfasına atsın req.sen

initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();


app.post("/register", async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  if ((await emailGetir(email)).exists){
    console.log('kullanici adi veya e-posta kullanılmaktadır');
    res.status(400).send({ hata: "hata olustu" });
  } else {
    try {
      veriEkle();
      res.status(200).send();
    } catch (error) {
      res.status(400).send({ hata: "hata olustu" });
    }
    console.log('kulllanici kayıt edildi');
  }

  async function veriEkle() {
    const docRef = db.collection("users").doc(email);
    docRef.get();
    await docRef.set({
      username: username,
      email: email,
      password: password,
    });
  }

});

app.post("/loginn", async (req, res) => {
  console.log(req.body);
  let username = req.body.username;
  let email = req.body.email;
  console.log(email);
  let password = req.body.password;

    if(password === await girisSifreGetir(email)){
      console.log('Basarıyla Giris Yaptınız');
      res.status(200).send();
  } else {
    console.log(' sifre yanlıs');
      res.status(400).send({ hata: "hata olustu" });
    }

  

    });
app.listen(port, function () {
  console.log("sunucu calısıyor...");
});
async function emailGetir(email) {
  const emailRef = db.collection("users").doc(email);
  const emaill = await emailRef.get();
  return emaill;
}
async function girisSifreGetir(email) {
  const emailRef = db.collection("users").doc(email);
  const sifre = await emailRef.get();
  if(sifre){
    try{
      return  sifre._fieldsProto.password.stringValue
    }
    catch{
      console.log("Yanlıs Kullanıcı adı")
    }
    
  }

}

