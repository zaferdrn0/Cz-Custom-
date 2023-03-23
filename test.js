const mongoose = require('mongoose');
const Users = require('./models/Users')
const Products = require('./models/Products')


mongoose.connect('mongodb://localhost:27017/czCustom_1')
  .then(() => console.log('Connected!'));

/* 
  Users.create({
    username: "zafer",
    email: "zafer@gmail.com",
    password: "1223"
    
 })  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


  Products.create({
    name: "pistol-mk",
    description: "asdasdasdasd",
    type:"pistol",
    price:"1455"
    
 })  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  }); */

// Kullanıcı getirme
  Users.find({
    username:"zafer"
  }) .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });


  Users.findByIdAndUpdate('ID Yİ BURAYA YAZ',{
    username: "ismi update edecek",
  })