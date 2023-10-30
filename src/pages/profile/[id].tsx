import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import {
  PokemonsProps,
  usePokeApiRequest,
} from "@/components/contexts/pokeApiRequestContext";
import * as S from "@/components/CardPokemon/styles";
import UniquePokemonInfo from "@/components/UniquePokemonInfo";
import axios from "axios";
import UniquePokemonStats from "@/components/UniquePokemonStats";
import EvolutionChain from "@/components/EvolutionChain";
import NextAndPreviousPokemon from "@/components/NextAndPreviousPokemon";

export interface PokemonSpeciesData {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  evolution_chain: {
    url: string;
  };
}

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const {
    loading,
    setLoading,
    pokemonEvolution,
    evolutionChain,
    getEvoluionChain,
    setEvolutionChainURLId,
    setUniquePokemon,
    getNextAndPreviusPokemon,
  } = usePokeApiRequest();
  const [flavorText, setFlavorText] = useState<any>([]);

  const getPokemon = useCallback(async () => {
    setLoading(false);
    const response = await axios
      .get<PokemonSpeciesData>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        setUniquePokemon(res);
        setLoading(true);
      });
  }, [id, setLoading, setUniquePokemon]);

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
      getPokemon();
      getPokemonsSpecies();
      getEvoluionChain();
      getNextAndPreviusPokemon();
    }
  }, [
    id,
    getPokemon,
    getPokemonsSpecies,
    getEvoluionChain,
    getNextAndPreviusPokemon,
  ]);

  // console.log("NEXTT", previusAndNextPokemon);

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
          <NextAndPreviousPokemon />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
