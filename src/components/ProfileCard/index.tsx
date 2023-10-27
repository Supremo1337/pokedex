import UniquePokemonInfo from "../UniquePokemonInfo";
import UniquePokemonStats from "../UniquePokemonStats";
import React, { useEffect, useState, useCallback } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import axios from "axios";

interface PokemonSpeciesData {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

interface ProfileCardProps {
  id: number;
}

export function ProfileCard({ id = 0 }: ProfileCardProps) {
  const { loading, setLoading } = usePokeApiRequest();
  const [uniquePokemon, setUniquePokemon] = useState<any>({});
  const [flavorText, setFlavorText] = useState<any>([]);

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
          setLoading(true);
        }
      });
  }, [id, setLoading]);

  useEffect(() => {
    if (id) {
      getPokemon();
      getPokemonsSpecies();
    }
  }, [id, getPokemon, getPokemonsSpecies]);

  return (
    <>
      {loading ? (
        <>
          <UniquePokemonInfo
            uniquePokemon={uniquePokemon}
            flavorText={flavorText}
          />
          <UniquePokemonStats uniquePokemon={uniquePokemon} />
        </>
      ) : (
        "Loading..."
      )}
    </>
  );
}
