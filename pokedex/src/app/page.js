"use client"; // Add this at the top of the file

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from "../Store/Store"; // Adjust the import path
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Home() {
  const {
    pokemons,
    fetchPokemons,
    currentPage,
    totalPages,
    catchPokemon,
    selectPokemon,
  } = useStore();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const itemsPerPage = 20;

  useEffect(() => {
    fetchPokemons(currentPage);
  }, [fetchPokemons, currentPage]);

  const handleSearch = async () => {
    const searchQuery = search.toLowerCase();
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchQuery}`
      );
      if (response.ok) {
        const pokemon = await response.json();
        catchPokemon(pokemon);
        selectPokemon(pokemon);
        router.push("/caught");
      } else {
        console.error("Pokémon not found");
      }
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
  };

  const handlePageChange = (page) => {
    fetchPokemons(page);
  };

  const handleCatch = (pokemon) => {
    catchPokemon(pokemon);
    selectPokemon(pokemon);
    router.push("/caught");
  };

  const renderPagination = () => {
    const pages = [];
    const totalPagesToShow = 3;

    let startPage = Math.max(1, currentPage - Math.floor(totalPagesToShow / 2));
    let endPage = startPage + totalPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - totalPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            onClick={() => handlePageChange(i)}
            active={i === currentPage}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "20px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        <Input
          placeholder="Enter your Pokémon name"
          style={{ width: "300px" }}
          className="w-fit"
          color="border-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="outline" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {pokemons.map((pokemon, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "10px",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <p>Height: {pokemon.height}</p>
            <p>Weight: {pokemon.weight}</p>
            <Button variant="outline" onClick={() => handleCatch(pokemon)}>
              Catch
            </Button>
          </div>
        ))}
      </div>
      {renderPagination()}
    </div>
  );
}