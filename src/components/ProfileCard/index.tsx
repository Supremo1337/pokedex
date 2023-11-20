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
import NextAndPreviousPokemonDesktop from "../NextAndPreviousPokemonDesktop";

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
    setEvolutionChain,
    getEvolutionChain,
    setEvolutionChainURLId,
    uniquePokemon,
    setUniquePokemon,
    getNextAndPreviusPokemon,
    setPokemonEvolution,
  } = usePokeApiRequest();
  const [flavorText, setFlavorText] = useState<string>("");

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

  // const fetchEvoluionChainData = useCallback(async () => {
  //   setLoading(false);
  //   const evolutionChainData = await getEvolutionChain();
  //   console.log("aaa", evolutionChainData);
  //   setEvolutionChain(evolutionChainData);
  //   if (evolutionChain && evolutionChain.chain) {
  //     // setEvolutionChain(response.data);
  //     let namePokemonsEvolutions: any[] = [];
  //     const chain = evolutionChain.chain;

  //     if (chain) {
  //       namePokemonsEvolutions.push(chain.species.name);

  //       if (chain.evolves_to && chain.evolves_to.length > 0) {
  //         namePokemonsEvolutions.push(
  //           chain.evolves_to.map((res) => res.species.name)
  //         );

  //         console.log(chain.evolves_to.map((res) => res.evolves_to));
  //       }
  //       if (chain.evolves_to && chain.evolves_to[0]?.evolves_to.length >= 1) {
  //         namePokemonsEvolutions.push(
  //           chain.evolves_to.map((res) =>
  //             res.evolves_to.map((res) => res.species.name)
  //           )
  //         );
  //       }

  //       if (namePokemonsEvolutions[1]?.length > 1) {
  //         const urlPokemonEvolutionsRest = [
  //           namePokemonsEvolutions[0],
  //           ...namePokemonsEvolutions[1],
  //         ].map((name: string) =>
  //           axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  //         );

  //         axios.all(urlPokemonEvolutionsRest).then((res) => {
  //           const pokemonEvolutionImages = res.map(
  //             (res: any) => res.data.sprites.other.dream_world.front_default
  //           );
  //           setPokemonEvolution(pokemonEvolutionImages);
  //         });
  //       } else {
  //         const urlPokemonEvolutions = namePokemonsEvolutions.map((name) =>
  //           axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  //         );

  //         axios.all(urlPokemonEvolutions).then((res) => {
  //           const pokemonEvolutionImages = res.map(
  //             (res) => res.data.sprites.other.dream_world.front_default
  //           );
  //           setPokemonEvolution(pokemonEvolutionImages);

  //           setLoading(true);
  //           // console.log("aqqqq");
  //         });
  //       }
  //     }
  //   } else {
  //     // setLoading(true);
  //   }
  //   setLoading(true);
  // }, [setEvolutionChain, setPokemonEvolution]);

  useEffect(() => {
    if (id) {
      setUniquePokemon(pokemons[id - 1]);
      getPokemonsSpecies();
      getEvolutionChain();
      // fetchEvoluionChainData();
      getNextAndPreviusPokemon();
    }
  }, [
    id,
    pokemons,
    getPokemonsSpecies,
    getEvolutionChain,
    // fetchEvoluionChainData,
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
