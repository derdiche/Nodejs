/*                      IMPORT                      */
const express = require("express"); //recuperation du paquet express
const morgan = require("morgan"); // enregistre les demandes HTTP et leurs réponses dans la console
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");

/*                       MAIN                      */
console.log("salut tout le monde");
const app = express(); //instace de express (serveur web ou va fonction notre API REST)
const port = 3000;
app
  .use(favicon(__dirname + "/favicon.ico"))
  .use(morgan("dev"))
  .use(bodyParser.json()); //middleware favicon et morgan, morgan suivis des activité du serveur
sequelize.initDb();

require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);
app.listen(
  port,
  console.log(`notre application node a démarée sur: http://localhost:${port}`)
);
