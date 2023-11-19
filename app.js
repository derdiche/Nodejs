// console.log("salut tout le monde");
const express = require("express"); //recuperation du paquet express
let pokemons = require("./mock-pokemon");
const app = express(); //instace de express (serveur web ou va fonction notre API REST
const port = 3000;
//HOME PAGE
app.get("/", (req, res) => res.send("salut, express!"));
//ajout d'un nouveau point de terminaison
//POKEMONS PAGE
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  res.send(`vous avez demande le pokemon ${pokemon.name} !`);
});
//EXO:mettre un nouveau point de terminaison qui retournera le nombre total de pokemon present dans notre API RESt
app.get("/api/pokemons", (req, res) => {
  res.send(
    `il y a ${pokemons.length} pokemons dans le pokedex, pour le moment!`
  );
});

app.listen(
  port,
  console.log(`notre application node a démarée sur: http://localhost:${port}`)
);
