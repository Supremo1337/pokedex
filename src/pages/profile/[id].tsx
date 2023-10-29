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
import { IPokemonInfoProps } from "@/components/CardPokemon";

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
  const [uniquePokemon, setUniquePokemon] = useState<any>({});
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

  // const getEvoluionChain = useCallback(async () => {
  //   setLoading(false);
  //   const response = await axios
  //     .get<IPokemonInfoProps>(
  //       `https://pokeapi.co/api/v2/evolution-chain/${evolutionChainURLId}`
  //     )
  //     .then((res) => {
  //       if (res.data && res.data.chain) {
  //         setEvolutionChain(res);
  //         let namePokemonsEvolutions: any[] = [];
  //         const chain = res.data.chain;

  //         if (chain) {
  //           namePokemonsEvolutions.push(chain.species.name);
  //           if (chain.evolves_to && chain.evolves_to.length > 0) {
  //             namePokemonsEvolutions.push(
  //               chain.evolves_to.map((res) => res.species.name)
  //             );
  //           }
  //           chain.evolves_to.forEach((element) => {
  //             if (element.evolves_to && element.evolves_to.length > 0) {
  //               namePokemonsEvolutions.push(
  //                 element.evolves_to.map((res) => res.species.name)
  //               );
  //             }
  //           });
  //         }
  //         console.log(namePokemonsEvolutions);

  //         const urlPokemonEvolutions = namePokemonsEvolutions.map((name) =>
  //           axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`)
  //         );

  //         axios.all(urlPokemonEvolutions).then((res) => {
  //           const pokemonEvolutionImages = res.map(
  //             (res) => res.data.sprites.other.dream_world.front_default
  //           );
  //           setPokemonEvolution(pokemonEvolutionImages);

  //           setLoading(true);
  //         });
  //       } else {
  //         setLoading(true);
  //       }
  //     });
  // }, [evolutionChainURLId, setLoading, setEvolutionChain, setPokemonEvolution]);

  useEffect(() => {
    if (id) {
      getPokemon();
      getPokemonsSpecies();
      getEvoluionChain();
    }
  }, [id, getPokemon, getPokemonsSpecies, getEvoluionChain]);

  console.log(evolutionChainURLId);

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
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
