import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";
import Link from "next/link";

export interface IPokemonInfoProps {
  name: string;
  data: any;
}
export interface CardPokemonProps {
  pokemon: IPokemonInfoProps;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  sizeScren: number;
}

export default function CardPokemon({
  pokemon,
  onClick = () => {},
  sizeScren = 0,
}: CardPokemonProps) {
  return (
    <Link href={`/profile/${pokemon.data?.id}`}>
      {/* <Link href={sizeScren < 1024 ? `/profile/${pokemon.data?.id}` : ""}> */}
      <S.Content onClick={onClick}>
        <S.PokemonInfo>
          <S.BackgroundPokemon type={pokemon.data?.types[0].type.name}>
            <S.PokemonImage
              $bgImage={
                pokemon.data?.id < 650
                  ? `url(${pokemon.data?.sprites.other.dream_world.front_default})`
                  : `url(${pokemon?.data?.sprites?.other["official-artwork"]?.front_default})`
              }
            />
          </S.BackgroundPokemon>
          <S.PokemonNumber>Nº 0{pokemon.data?.id}</S.PokemonNumber>
          <S.PokemonName>{pokemon.data?.name}</S.PokemonName>
        </S.PokemonInfo>
        <S.TypesGroup>
          {pokemon.data?.types.map((type: any, index: number) => {
            return (
              <S.TypeCard key={index} type={type.type.name}>
                {type.type.name}
              </S.TypeCard>
            );
          })}
        </S.TypesGroup>
      </S.Content>
      {/* </Link> */}
    </Link>
  );
}
