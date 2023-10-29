import UniquePokemonInfo from "../UniquePokemonInfo";
import UniquePokemonStats from "../UniquePokemonStats";
import React, { useEffect, useState, useCallback } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import axios from "axios";
import { IPokemonInfoProps } from "../CardPokemon";
import EvolutionChain from "../EvolutionChain";
import { PokemonSpeciesData } from "@/pages/profile/[id]";

interface ProfileCardProps {
  id: number;
}

export function ProfileCard({ id = 0 }: ProfileCardProps) {
  const {
    loading,
    pokemons,
    setLoading,
    pokemonEvolution,
    setPokemonEvolution,
    evolutionChain,
    setEvolutionChain,
    getEvoluionChain,
    evolutionChainURLId,
    SetEvolutionChainURLId,
  } = usePokeApiRequest();
  const [uniquePokemon, setUniquePokemon] = useState<any>({});
  const [flavorText, setFlavorText] = useState<any>([]);
  // const { pokemonEvolution, evolutionChain, setPokemonEvolution } =
  //   usePokeApiRequest();

  // const getPokemon = useCallback(async () => {
  //   setLoading(false);
  //   const response = await axios
  //     .get<PokemonSpeciesData>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
  //     .then((res) => {
  //       setUniquePokemon(res);
  //       setLoading(true);
  //     });
  // }, [id, setLoading]);

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
      // getPokemon();
      setUniquePokemon(pokemons[id - 1]);
      getPokemonsSpecies();
      getEvoluionChain();
    }
  }, [id, pokemons, getPokemonsSpecies, getEvoluionChain]);

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
          {console.log(evolutionChain)}
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
