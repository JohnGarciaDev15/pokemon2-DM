import { LitElement } from 'lit-element';

export class Pokemon2Dm extends LitElement {

  async fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    )
 
    this.pokemons = pokemonDetails.filter(pokemon => !pokemon.evolves_from_species).map(pokemon => ({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
    }));
  }
}
