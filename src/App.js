import React, { useState, useEffect } from 'react';
import './index.css'; 
import SearchBar from './searchbar';
import Display from './display';
import HomeButton from './homebutton';
import './homebutton.css';

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchedPokemon, setSearchedPokemon] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon list');
        }
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPokemonList();
  }, []);

  const handleSearch = async (searchTermOrUrl) => {
    try {
      let response;
      if (searchTermOrUrl.includes('https://')) {
        response = await fetch(searchTermOrUrl);
      } else if (!isNaN(searchTermOrUrl)) {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parseInt(searchTermOrUrl)}`);
      } else {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTermOrUrl.toLowerCase()}`);
      }

      if (!response.ok) {
        throw new Error('Pokemon not found');
      }

      const data = await response.json();
      setSearchedPokemon(data);
      setError(null);
    } catch (err) {
      setSearchedPokemon(null);
      setError(err.message);
    }
  };

  const handleReturnHome = () => {
    setSearchedPokemon(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>Welcome to PokeDex</h1>
      <SearchBar onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {searchedPokemon && (
        <div>
          <Display pokemon={searchedPokemon} />
          <HomeButton onClick={handleReturnHome} />
        </div>
      )}
      {!searchedPokemon && (
        <div className="pokemon-list">
          {pokemonList.map((pokemon, index) => (
            <PokemonCard key={index} url={pokemon.url} onClick={handleSearch} />
          ))}
        </div>
      )}
    </div>
  );
}

function PokemonCard({ url, onClick }) {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setPokemon(data);
    };

    fetchPokemon();
  }, [url]);

  if (!pokemon) return null;

  return (
    <div className="pokemon-card" onClick={() => onClick(url)}>
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      
    </div>
  );
}

export default App;
