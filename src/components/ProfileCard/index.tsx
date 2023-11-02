import UniquePokemonInfo from "../UniquePokemonInfo";
import UniquePokemonStats from "../UniquePokemonStats";
import React, { useEffect, useState, useCallback } from "react";
import {
  PokemonsProps,
  usePokeApiRequest,
} from "../contexts/pokeApiRequestContext";
import axios from "axios";
import EvolutionChain from "../EvolutionChain";
import { PokemonSpeciesData } from "@/pages/profile/[id]";
import NextAndPreviousPokemon from "../NextAndPreviousPokemon";
import NextAndPreviousPokemonDesktop from "../NextAndPreviousPokemon";

interface ProfileCardProps {
  id: number;
}

export function ProfileCard({ id = 0 }: ProfileCardProps) {
  const {
    loading,
    pokemons,
    setLoading,
    pokemonEvolution,
    evolutionChain,
    getEvoluionChain,
    setEvolutionChainURLId,
    uniquePokemon,
    setUniquePokemon,
    getNextAndPreviusPokemon,
  } = usePokeApiRequest();
  const [flavorText, setFlavorText] = useState<any>([]);

  const getPokemonsSpecies = useCallback(async () => {
    setLoading(false);
    const response = await axios
      .get<PokemonSpeciesData>(
        `https://pokeapi.co/api/v2/pokemon-species/${id}/`
      )
      .then((res) => {
        if (res.data) {
          const filteredFlavorTextEntries = res.data.flavor_text_entries.filter(
            (element) => element.language.name === "en"
          );
          const flavorTextEntry: { flavor_text: string } | {} =
            filteredFlavorTextEntries.length > 0
              ? filteredFlavorTextEntries[0]
              : {};

          const flavorText =
            "flavor_text" in flavorTextEntry
              ? (flavorTextEntry as { flavor_text: string }).flavor_text
              : "";

          setFlavorText(flavorText);
          setLoading(true);
        }
        setEvolutionChainURLId(
          res.data.evolution_chain.url.replace(
            "https://pokeapi.co/api/v2/evolution-chain/",
            ""
          )
        );
      });
  }, [id, setLoading, setEvolutionChainURLId]);

  useEffect(() => {
    if (id) {
      setUniquePokemon(pokemons[id - 1]);
      getPokemonsSpecies();
      getEvoluionChain();
      getNextAndPreviusPokemon();
    }
  }, [
    id,
    pokemons,
    getPokemonsSpecies,
    getEvoluionChain,
    getNextAndPreviusPokemon,
    setUniquePokemon,
  ]);

  return (
    <>
      {loading ? (
        <>
          <UniquePokemonInfo flavorText={flavorText} />
          <UniquePokemonStats />
          <EvolutionChain
            evolutionChain={evolutionChain}
            pokemonEvolution={pokemonEvolution}
          />
          <NextAndPreviousPokemonDesktop />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
