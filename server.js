const http = require('http');
const express = require('express');
const fetch = require('node-fetch');
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const app = express();
var path = require('path')
const port = 3000;
const serviceAccount = require('./cz-custom-firebase-adminsdk-t3g7q-073c9dce51.json')


app.use(express.static("public"));

app.listen(port,function (){
  
  
  
    console.log("sunucu calısıyor...")
});

/* initializeApp({
    credential: cert(serviceAccount)});
    const db = getFirestore();

    async function veriEkle(){
      const docRef = await db.collection('users').doc(username);
      docRef.set({
         username: username,
         email: email,
         password: password
       });
  }
  

async function veriGetir() {  
const snapshot =  await db.collection('users').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});}*/



app.post("/register", (req, res) => {
  console.log(req.body); 
});