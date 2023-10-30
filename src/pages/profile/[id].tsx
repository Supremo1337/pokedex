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
    setPokemonEvolution,
    evolutionChain,
    setEvolutionChain,
    getEvoluionChain,
    evolutionChainURLId,
    SetEvolutionChainURLId,
  } = usePokeApiRequest();
  const [uniquePokemon, setUniquePokemon] = useState<any>([]);
  const [previusAndNextPokemon, setPreviusAndNextPokemon] = useState<any>([]);
  // const [pokemonEvolution, setPokemonEvolution] = useState<any>([]);
  const [flavorText, setFlavorText] = useState<any>([]);
  // const [evolutionChain, SetEvolutionChain] = useState<any>([]);
  // const [evolutionChainURLId, SetEvolutionChainURLId] = useState<any>([]);

  // console.log("iddd aq", id);

  const getPokemon = useCallback(async () => {
    setLoading(false);
    const response = await axios
      .get<PokemonSpeciesData>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        setUniquePokemon(res);
        setLoading(true);
      });
  }, [id, setLoading]);

  const getPokemonNext = useCallback(async () => {
    setLoading(false);
    var endpoints = [];
    if (uniquePokemon.data?.id && id) {
      if (uniquePokemon.data?.id !== 1) {
        await endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id - 1}/`,
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      } else {
        await endpoints.push(
          `https://pokeapi.co/api/v2/pokemon/${uniquePokemon.data?.id + 1}/`
        );
      }

      var response = axios
        .all(
          endpoints.map(
            async (endpoint) => await axios.get<PokemonsProps>(endpoint)
          )
        )
        .then((res) => {
          setPreviusAndNextPokemon(res);
          setLoading(true);
        });
    }
  }, [setLoading, id, uniquePokemon.data?.id]);

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
          console.log(typeof evolutionChainURLId);
          setLoading(true);
        }
        SetEvolutionChainURLId(
          res.data.evolution_chain.url.replace(
            "https://pokeapi.co/api/v2/evolution-chain/",
            ""
          )
        );
      });
  }, [id, setLoading, evolutionChainURLId, SetEvolutionChainURLId]);

  useEffect(() => {
    if (id) {
      getPokemon();
      getPokemonsSpecies();
      getEvoluionChain();
      getPokemonNext();
    }
  }, [id, getPokemon, getPokemonsSpecies, getEvoluionChain, getPokemonNext]);

  console.log("NEXTT", previusAndNextPokemon);

  return (
    <>
      {loading ? (
        <>
          <UniquePokemonInfo
            uniquePokemon={uniquePokemon}
            flavorText={flavorText}
          />
          <UniquePokemonStats uniquePokemon={uniquePokemon} />
          <EvolutionChain
            uniquePokemon={uniquePokemon}
            evolutionChain={evolutionChain}
            pokemonEvolution={pokemonEvolution}
          />
          <NextAndPreviousPokemon
            uniquePokemon={uniquePokemon}
            previusAndNextPokemon={previusAndNextPokemon}
          />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
