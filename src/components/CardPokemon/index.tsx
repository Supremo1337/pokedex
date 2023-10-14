import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";

export interface IPokemonInfoProps {
  name: string;
  data: any;
}
export interface CardPokemonProps {
  pokemon: IPokemonInfoProps;
}

export default function CardPokemon({ pokemon }: CardPokemonProps) {
  return (
    <S.Content>
      <S.PokemonInfo>
        <S.BackgroundPokemon type={pokemon.data.types[0].type.name}>
          <S.PokemonImage
            bgImage={
              pokemon.data.id < 650
                ? `url(${pokemon.data.sprites.other.dream_world.front_default})`
                : `url(${pokemon.data.sprites.other["official-artwork"].front_default})`
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
}
