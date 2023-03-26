const email = document.getElementById("email");
const password = document.getElementById("password");

function login() {
  fetch("/loginUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.yonlendir != undefined) window.location.replace(data.yonlendir);
      console.log(data);
      let message = JSON.stringify(data, ["message"]);
      const mes = message.split(".");
      let word = mes[1];
      alert(word);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
