import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  PokemonsProps,
  usePokeApiRequest,
} from "@/components/contexts/pokeApiRequestContext";
import * as S from "@/components/CardPokemon/styles";
import UniquePokemonInfo from "@/components/UniquePokemonInfo";
import axios from "axios";
import UniquePokemonStats from "@/components/UniquePokemonStats";

interface PokemonSpeciesData {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
  // Other properties you need
}

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;
  const { pokemons, getPokemons, loading, setLoading } = usePokeApiRequest();
  const [uniquePokemon, setUniquePokemon] = useState<any>([]);
  const [flavorText, setFlavorText] = useState<any>([]);

  console.log("iddd aq", id);

  const getPokemonsSpecies = async () => {
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
          setUniquePokemon(res);
          setLoading(true);
        }
      });
  };

  useEffect(() => {
    getPokemons();
    if (id) {
      getPokemonsSpecies();
    }
  }, [id]);

  const selectedPokemon = pokemons.find(
    (pokemon) =>
      pokemon.data?.id.toString() === id ||
      pokemon.data?.name.toLowerCase() === id
  );

  // if (!selectedPokemon) {
  //   return <p>O pokemon não encontrado</p>;
  // }
  // console.log("AQQQQ", selectedPokemon);

  return (
    <>
      {loading ? (
        <>
          <UniquePokemonInfo
            uniquePokemon={uniquePokemon}
            selectedPokemon={selectedPokemon}
            flavorText={flavorText}
          />
          {/* <div>{flavorText}</div> */}
          <UniquePokemonStats
            uniquePokemon={uniquePokemon}
            selectedPokemon={selectedPokemon}
          />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
