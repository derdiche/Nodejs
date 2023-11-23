/*                      IMPORT                      */
const express = require("express"); //recuperation du paquet express
let pokemons = require("./mock-pokemon"); // recuperation des données
const { succes, getUniqueId } = require("./helper.js"); // recuperation destrucuré de la methode succes
const morgan = require("morgan"); // enregistre les demandes HTTP et leurs réponses dans la console
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const { Sequelize } = require("sequelize"); //ORM permet de de manipuler des bases de données relationnelles.
/*                       MAIN                      */
// console.log("salut tout le monde");
const app = express(); //instace de express (serveur web ou va fonction notre API REST
const port = 3000;
//Middleware perso
// app.use((req, res, next) => {
//   //middleware qui affichera les requete recu par l'API REST
//   console.log(`url: ${req.url}`);
//   next(); //terminaison du middleware
// });
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json()); //middleware favicon et morgan, morgan suivis des activité du serveur
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
//ajout d'un pokemon
app.post("/api/pokemons", (req, res) => {
  const id = getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `le pokemon ${pokemonCreated.name} a bien été crée`;
  res.json(succes(message, pokemonCreated));
});
//modification d'un pokemon

app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons = pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(success(message, pokemonUpdated));
});
//supprimer un pokemon
app.delete("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonDeleted = pokemons.find((pokemon) => pokemon.id === id);
  pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`;
  res.json(success(message, pokemonDeleted));
});
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
/*                      Base de données                      */

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});
sequelize
  .authenticate()
  .then((_) =>
    console.log("la conexion à la base de données a bien été établie")
  )
  .catch((error) =>
    console.error(`impossible de se connecter a la base de données ${error}`)
  );

/*************************************************** */
app.listen(
  port,
  console.log(`notre application node a démarée sur: http://localhost:${port}`)
);
