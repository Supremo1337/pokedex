import React, { useEffect, useState } from "react";
import * as S from "./styles";
import axios from "axios";
import Link from "next/link";
import * as GS from "@/styles/globalStyles";
import { IPokemonInfoProps } from "@/interface";

export interface Chain {
  species: {
    name: string;
  };
  evolves_to: Chain[];
}

export interface CardPokemonProps {
  pokemon: IPokemonInfoProps;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  sizeScreen: number;
}

export default function CardPokemon({
  pokemon,
  onClick = () => {},
  sizeScreen = 0,
}: CardPokemonProps) {
  return (
    <Link href={sizeScreen < 1024 ? `/profile/${pokemon.id}` : ""}>
      <S.Content onClick={onClick}>
        <S.PokemonInfo>
          <S.BackgroundPokemon type={pokemon.types[0].type.name}>
            <GS.PokemonImage
              $width="85%"
              $height="85%"
              $bgImage={
                pokemon.id < 650
                  ? `url(${pokemon.sprites.other.dream_world.front_default})` ||
                    ""
                  : `url(${pokemon.sprites?.other["official-artwork"]?.front_default})` ||
                    ""
              }
            />
          </S.BackgroundPokemon>
          <GS.PokemonNumber $font="paragraph_4">
            Nº 0{pokemon.id}
          </GS.PokemonNumber>
          <GS.PokemonName $font="title_4">{pokemon.name}</GS.PokemonName>
        </S.PokemonInfo>
        <S.TypesGroup>
          {pokemon.types.map((type: any, index: number) => {
            return (
              <GS.TypeCard key={index} type={type.type.name}>
                {type.type.name}
              </GS.TypeCard>
            );
          })}
        </S.TypesGroup>
      </S.Content>
      {/* </Link> */}
    </Link>
  );
}
