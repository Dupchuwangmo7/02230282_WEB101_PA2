
import { create } from 'zustand';

const useStore = create(set => ({
  pokemons: [],
  caughtPokemons: [],
  currentPage: 1,
  totalPages: 0,
  fetchPokemons: async (page = 1) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${(page - 1) * 20}`);
    const data = await response.json();
    const pokemonDetails = await Promise.all(data.results.map(async pokemon => {
      const res = await fetch(pokemon.url);
      return res.json();
    }));
    set({ pokemons: pokemonDetails, currentPage: page, totalPages: Math.ceil(data.count / 20) });
  },
  catchPokemon: (pokemon) => set(state => ({ caughtPokemons: [...state.caughtPokemons, pokemon] })),
  releasePokemon: (pokemon) => set(state => ({ caughtPokemons: state.caughtPokemons.filter(p => p.name !== pokemon.name) })),
  selectPokemon: (pokemon) => set({ selectedPokemon: pokemon }),
  resetSelectedPokemon: () => set({ selectedPokemon: null }),
}));

export default useStore;