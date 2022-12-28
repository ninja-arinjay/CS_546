//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes

const express = require("express");
const router = express.Router();
const axios = require("axios");
const pokemonApi = require("../data");
const pokemonApiData = pokemonApi.pokemon;

router
  .route('/pokemon')
  .get(async (req,res) => {
    try {
        const data = await pokemonApiData.getPokemon();
        res.json(data);
    } catch (e) {
        res.status(500).json(e);
    }
});

router
  .route('/pokemon/:id')
  .get(async (req,res) => {
    try {
        // To check if the id is valid or not
        let id = req.params.id;
        // Remove extra white space from the id
        id = id.trim();
        //filter pure string values and still not a number
        if (isNaN(parseInt(id)) || (parseInt(id) < 0)) {
            return res.status(400).json({ ERROR: "Invalid URL Parameter"});
        }
        const pokemon = await pokemonApiData.getPokemonById(id);
        res.json(pokemon.data);
    } catch (e) {
        return res.status(404).json({message: "Pokémon Not Found!"}); 
    }
});

module.exports = router;

