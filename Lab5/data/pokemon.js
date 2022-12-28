//Your data modules to make the Axios calls and get the data

const axios = require('axios');
const helpers = require('../helpers')

let exportedMethods = {
    async getPokemon(){
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
        return data; // this will be the array of pokemon objects
      },
    async getPokemonById(id) { 
        helpers.checkId(id); 
        const pokemonId = await axios.get('https://pokeapi.co/api/v2/pokemon/'+id);
        return pokemonId;
    }
}

module.exports = exportedMethods;

