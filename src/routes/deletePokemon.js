const { Pokemon } = require("../db/sequelize");

module.exports = (app) => {
  app.delete("/api/pokemons/:id", (req, res) => {
    Pokemon.findByPk(req.params.id).then((pokemon) => {
      const pokemonDeleted = pokemon;
      if (pokemon === null) {
        const message =
          "le pokémon n'existepas,Réessayez avec un autre identifiant";
        return res.status(404).json({ message });
      }
      Pokemon.destroy({
        where: { id: pokemon.id },
      })
        .then((_) => {
          const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`;
          res.json({ message, data: pokemonDeleted });
        })
        .catch((error) => {
          const message =
            "le pokémon n'a pas pu être ajouté, veuillez réessayer";
          res.status(500).json({ message, data: error });
        });
    });
  });
};
