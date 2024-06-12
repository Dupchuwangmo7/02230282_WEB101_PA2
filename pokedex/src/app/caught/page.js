
"use client"; // Add this at the top of the file

import { useRouter } from 'next/navigation';
import useStore from '../../Store/Store'; // Adjust the import path
import { Button } from "@/components/ui/button";

export default function Caught() {
  const { caughtPokemons = [], releasePokemon } = useStore();
  const router = useRouter();

  return ( 
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
      <Button variant="outline" onClick={() => router.back()} style={{ marginBottom: '20px' }}>
        Back
      </Button>
      <h2>Caught Pokémon</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {caughtPokemons.map((pokemon, index) => (
          <div key={index} style={{ border: '1px solid black', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h3>{pokemon.name}</h3>
        
            <Button variant="outline" onClick={() => releasePokemon(pokemon)}>Release</Button>
          </div>
        ))}
      </div> 
    </div>
  );
} 