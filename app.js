// console.log("salut tout le monde");
const express = require("express"); //recuperation du paquet express
const app = express(); //instace de express (serveur web ou va fonction notre API REST
const port = 3000;
app.get("/", (req, res) => res.send("salut, express"));
app.listen(
  port,
  console.log(`notre application node a démarée sur: http://localhost:${port}`)
);
