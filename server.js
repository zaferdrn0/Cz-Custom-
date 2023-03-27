const path = require("path");
const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const app = express();
const port = 3000;
const Users = require("./models/Users");
const Products = require("./models/Products");
const Types = require("./models/Type");
const { json } = require("express");

mongoose
  .connect("mongodb://localhost:27017/czCustom")
  .then(() => console.log("Connected!"));
const store = new MongoDBStore({
  uri: "mongodb://localhost:27017/czCustom",
  collection: "sessions",
});

app.use(express.static("public"));
app.use(require("body-parser").json());
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    store: store,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/Index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/login.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/create.html"));
});
app.get("/productadd", (req, res) => {
  try {
    const adminUser = req.session.Users.admin;
    if (adminUser === "1") {
      res.sendFile(path.resolve(__dirname, "./public/productAdd.html"));
    } else {
      res.status(401).send("Yetkisiz Erişim");
    }
  } catch {
    res.status(401).send("Admin Olarak giriş yapınız");
  }
});

app.get("/product", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/product.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public/cart.html"));
});

app.post("/registerUser", async (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

  await Users.findOne({
    email: email,
  })
    .then((result) => {
      if (result) {
        let hataMesaji = JSON.stringify({
          message: ".Kullanıcı Mevcut.",
        });
        return res.send(hataMesaji);
      } else {
        const yeniKullanici = new Users({
          username: username,
          email: email,
          password: password,
        });
        yeniKullanici.save();
        let message = JSON.stringify({
          message: ".Basariyla kayit oldunuz.",
          yonlendir: "/login",
        });
        return res.send(message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/loginUser", async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  await Users.findOne({
    email: email,
  })
    .then((result) => {
      if (result) {
        if (email === result.email && password === result.password) {
          req.session.Users = result;
          console.log(req.session);
          let message = JSON.stringify({
            message: ".Basarıyla Giris Yaptınız.",
            yonlendir: "/",
          });
          return res.send(message);
        } else {
          let hataMesaji = JSON.stringify({
            message: ".Sifre yanlis.",
          });
          return res.send(hataMesaji);
        }
      } else {
        let hataMesaji = JSON.stringify({
          message: ".Eposta Adresi Kayıtlı Degil.",
        });
        return res.send(hataMesaji);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/productAdd", async (req, res) => {
  let title = req.body.title;
  let label = req.body.label;
  let type = req.body.type;
  let price = req.body.price;
  let image = req.body.image;

  await Products.findOne({
    name: title,
  })
    .then((result) => {
      if (result) {
        let hataMesaji = JSON.stringify({
          message: ".Bu Urun Mevcut.",
        });
        return res.send(hataMesaji);
      } else {
        const yeniUrun = new Products({
          name: title,
          description: label,
          type: type,
          image: image,
          price: price,
        });
        yeniUrun.save();
        let message = JSON.stringify({
          message: ".Urun Basarıyla Ekledi.",
        });
        return res.send(message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/typeAdd", async (req, res) => {
  let typeName = req.body.name;

  await Types.findOne({
    name: typeName,
  })
    .then((result) => {
      if (result) {
        let hataMesaji = JSON.stringify({
          message: ".Bu Urun Mevcut.",
        });
        return res.send(hataMesaji);
      } else {
        const yeniType = new Types({
          name: typeName,
        });
        yeniType.save();
        let message = JSON.stringify({
          message: ".Urun Basarıyla Ekledi.",
        });
        return res.send(message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/getType", async (req, res) => {
  await Types.find({}, "name")
    .then((result) => {
      var productTypesArr = [];

      result.forEach((type) => {
        productTypesArr.push(type.name);
      });
      res.send(productTypesArr);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.post("/product", (req, res) => {
  Products.find({})
    .then((result) => {
      var productArr = [];
      result.forEach((prod) => {
        productArr.push(prod);
      });
      res.send(productArr);
    })
    .catch((error) => {
      console.log(error);
    });
});

/*
app.post('/productCheck', async (req, res )=> {
  
   if (!req.session.Users) {
    return res.send(JSON.stringify({
      message: "giris yapınız",
      yonlendir:"/login"
    }))
  }

    else{
      console.log(req.session.Users);
      let productId = req.body.id;
      let email = req.session.Users.email;
      let user = await Users.findOne({ email: email});
      user.cart.push(productId);
      user.save();

      return res.send(JSON.stringify({
        kullaniciAdi: req.session.Users.username,
        message: "Sepete eklendi",
        
      }));
    } 
       
    


});
*/

app.post("/cart", async (req, res) => {
  var array = [];
  var cartItems = req.body.cartItems;
  var cartArr = cartItems;
  try{
    for (let i = 0; i < cartArr.length; i++) {
      let product = await Products.findOne({ _id: cartItems[i].id });
      let data = JSON.stringify({
        id: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        adet: cartItems[i].adet,
      });
      var veri = JSON.parse(data);
      array.push(veri);
    }
    res.send(array);
  }
  catch{
    
  }
 
});

app.post("/loginCheck", (req, res) => {
  try {
    let adminUsers = req.session.Users.admin;

    if (!req.session.Users) {
      return res.send(
        JSON.stringify({
          data: "kullanıcıYok",
        })
      );
    } else if (req.session.Users) {
      return res.send(
        JSON.stringify({
          admin: adminUsers,
          data: "kullanıcıVar",
        })
      );
    }
  } catch {}
});

app.post("/cikisYapp", async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("hatali");
    }
    res.clearCookie("connect.sid");
    console.log("calisti");
    return res.send(JSON.stringify({ yonlendir: "/" }));
  });
});

app.listen(port, () => {
  console.log(` Server Çalışıyor , ${port}`);
});
