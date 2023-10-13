import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

export default function CardPokemon() {
  const [pokemons, setPokemons] = useState<any[]>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    setLoading(false);
    var endpoints = [];
    for (var i = 1; i < 49; i++) {
      endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    }
    var response = axios
      .all(endpoints.map(async (endpoint) => await axios.get(endpoint)))
      .then((res) => {
        setPokemons(res);
        console.log(res);
        setLoading(true);
      });
    console.log(endpoints);
  };

  return (
    <>
      {loading ? (
        <S.Wrapper>
          {pokemons.map((pokemon, index) => {
            return (
              <S.Content key={index}>
                <S.PokemonInfo>
                  <S.BackgroundPokemon type={pokemon.data.types[0].type.name}>
                    <S.PokemonImage
                      bgImage={
                        `url(${pokemon.data.sprites.other.dream_world.front_default})` ||
                        ""
                      }
                    />
                  </S.BackgroundPokemon>
                  <S.PokemonNumber>Nº 0{pokemon.data.id}</S.PokemonNumber>
                  <S.PokemonName>{pokemon.data.name}</S.PokemonName>
                </S.PokemonInfo>
                {pokemon.data.types[1] ? (
                  <>
                    <S.TypeCard type={pokemon.data.types[0].type.name}>
                      {pokemon.data.types[0].type.name}
                    </S.TypeCard>
                    <S.TypeCard type={pokemon.data.types[1].type.name}>
                      {pokemon.data.types[1].type.name}
                    </S.TypeCard>
                  </>
                ) : (
                  <S.TypeCard type={pokemon.data.types[0].type.name}>
                    {pokemon.data.types[0].type.name}
                  </S.TypeCard>
                )}
                {/* <S.TypeCard>Lutador</S.TypeCard> */}
              </S.Content>
            );
          })}
        </S.Wrapper>
      ) : (
        "loading..."
      )}
    </>
  );
}
