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
  name: string;
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
    getEvolutionChain,
    setEvolutionChainURLId,
    setUniquePokemon,
    getNextAndPreviusPokemon,
    evolutionChainURLId,
  } = usePokeApiRequest();
  const [flavorText, setFlavorText] = useState<any>([]);

  const getPokemon = useCallback(async () => {
    // Faz uma requisição para obter os dados do Pokémon
    const { data } = await axios.get<PokemonSpeciesData>(
      `https://pokeapi.co/api/v2/pokemon/${id}/`
    );

    // Verifica se o nome do Pokémon contém um traço ("-")
    if (data.name && data.name.includes("-")) {
      // Remove tudo depois do traço
      data.name = data.name.split("-")[0];
    }

    // Retorna os dados do Pokémon
    return data;
  }, [id]);

  const fetchPokemonData = useCallback(async () => {
    const uniquePokemonData = await getPokemon();
    setUniquePokemon(uniquePokemonData);
  }, [getPokemon]);

  const getPokemonsSpecies = useCallback(async () => {
    const { data } = await axios.get<PokemonSpeciesData>(
      `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    );
    return data;
  }, [id]);

  const fetchDataPokemonSpecies = useCallback(async () => {
    const pokemonsSpecies = await getPokemonsSpecies();
    const filteredFlavorTextEntries =
      pokemonsSpecies.flavor_text_entries.filter(
        (element) => element.language.name === "en"
      );
    const flavorTextEntry: { flavor_text: string } | {} =
      filteredFlavorTextEntries.length > 0 ? filteredFlavorTextEntries[0] : {};
    const flavorText =
      "flavor_text" in flavorTextEntry
        ? (flavorTextEntry as { flavor_text: string }).flavor_text
        : "";
    setFlavorText(flavorText);

    setEvolutionChainURLId(
      pokemonsSpecies.evolution_chain.url.replace(
        "https://pokeapi.co/api/v2/evolution-chain/",
        ""
      )
    );
  }, [getPokemonsSpecies]);

  const getPokemonData = useCallback(async () => {
    // Inicie o estado de carregamento como falso
    setLoading(false);

    try {
      // Realize todas as requisições necessárias
      // await getPokemon();
      // await getPokemonsSpecies();
      await fetchPokemonData();
      await fetchDataPokemonSpecies();
      await getEvolutionChain();
      await getNextAndPreviusPokemon();

      // Atualize o estado de carregamento como verdadeiro quando todas as requisições forem concluídas
      setLoading(true);
    } catch (error) {
      // Lide com erros, se necessário
      console.error("Erro ao buscar dados:", error);
      setLoading(true); // Certifique-se de definir setLoading como verdadeiro em caso de erro
    }
  }, [
    // getPokemon,
    // getPokemonsSpecies,
    fetchPokemonData,
    fetchDataPokemonSpecies,
    getEvolutionChain,
    getNextAndPreviusPokemon,
    setLoading,
  ]);

  useEffect(() => {
    if (id) {
      getPokemonData();
    }
  }, [id, getPokemonData]);

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
