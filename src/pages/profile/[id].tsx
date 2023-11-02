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
import NextAndPreviousPokemon from "@/components/NextAndPreviousPokemonDesktop";

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
    // setLoading(false);
    const response = await axios
      .get<PokemonSpeciesData>(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((res) => {
        setUniquePokemon(res);
        // setLoading(true);
      });
  }, [id, setUniquePokemon]);

  const getPokemonsSpecies = useCallback(async () => {
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
          // setLoading(true);
        }
        setEvolutionChainURLId(
          res.data.evolution_chain.url.replace(
            "https://pokeapi.co/api/v2/evolution-chain/",
            ""
          )
        );
      });
  }, [id, setEvolutionChainURLId]);

  const getPokemonData = useCallback(async () => {
    // Inicie o estado de carregamento como falso
    setLoading(false);

    try {
      // Realize todas as requisições necessárias
      await getPokemon();
      await getPokemonsSpecies();
      await getEvoluionChain();
      await getNextAndPreviusPokemon();

      // Atualize o estado de carregamento como verdadeiro quando todas as requisições forem concluídas
      setLoading(true);
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao buscar dados:", error);
      setLoading(true); // Certifique-se de definir setLoading como verdadeiro em caso de erro
    }
  }, [
    getPokemon,
    getPokemonsSpecies,
    getEvoluionChain,
    getNextAndPreviusPokemon,
    setLoading,
  ]);

  useEffect(() => {
    if (id) {
      getPokemonData();
    }
  }, [id, getPokemonData]);

  useEffect(() => {
    if (id) {
      getPokemonData();
    }
  }, [id, getPokemonData]);

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
