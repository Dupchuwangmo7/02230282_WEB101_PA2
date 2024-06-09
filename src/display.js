import React from 'react';

function Display({ pokemon }) {
  return (
    <div className="pokemon-display">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
      <p>Abilities: {pokemon.abilities.map(ability => ability.ability.name).join(', ')}</p>
      <p>Moves: {pokemon.moves.slice(0, 5).map(move => move.move.name).join(', ')}</p>
    </div>
  );
}

export default Display;
