// console.log("salut tout le monde");
const express = require("express"); //recuperation du paquet express
let pokemons = require("./mock-pokemon"); // recuperation des données
const { succes } = require("./helper.js"); // recuperation destrucuré de la methode succes
const morgan = require("morgan");
const favicon = require("serve-favicon");
/*                      IMPORT                      */
const app = express(); //instace de express (serveur web ou va fonction notre API REST
const port = 3000;
//Middleware

// app.use((req, res, next) => {
//   //middleware qui affichera les requete recu par l'API REST
//   console.log(`url: ${req.url}`);
//   next(); //terminaison du middleware
// });
app.use(favicon(__dirname + "/favicon.ico")).use(morgan("dev"));
//HOME PAGE
app.get("/", (req, res) => res.send("salut, express!"));
//ajout d'un nouveau point de terminaison
//POKEMONS PAGE
app.get("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  let message =
    pokemon === undefined
      ? `le pokemon n°${id} n'est pas dans notre pokedex`
      : "succes;";
  // res.send(`vous avez demande le pokemon ${pokemon.name} !`);//CETTE METHODE NE REVOI PAS JSON FORMAT STANDAR
  res.json(succes(message, pokemon));
});

app.post("/api/pokemons/:id", (req, res) => {
  const id = 123;
}); //ajout d'un pokemon

//EXO1:mettre un nouveau point de terminaison qui retournera le nombre total de pokemon present dans notre API RESt
// app.get("/api/pokemons", (req, res) => {
//   res.send(
//     `il y a ${pokemons.length} pokemons dans le pokedex, pour le moment!`
//   );
// });
//EXO2:renvoyer la liste des pokemons
app.get("/api/pokemons", (req, res) => {
  res.send(succes("La liste des pokemon a bien été recuperée", pokemons));
});

app.listen(
  port,
  console.log(`notre application node a démarée sur: http://localhost:${port}`)
);
