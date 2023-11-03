import { IPokemonInfoProps, ProfileProps } from "@/interface";
import * as S from "./styles";
import * as GS from "@/styles/globalStyles";
import { useEffect, useState } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import Link from "next/link";

export default function NextAndPreviousPokemonDesktop() {
  const { previusAndNextPokemon, uniquePokemon, setId } = usePokeApiRequest();
  const previusPokemonIsNextOnlyIfIdIs1 = previusAndNextPokemon?.[0]?.data;
  const nextPokemon = previusAndNextPokemon?.[1]?.data;
  // console.log("NEXT AQ PORRA NO COMPONENT", previusPokemonIsNextOnlyIfIdIs1);

  return (
    <S.Content>
      {uniquePokemon?.id !== 1 ? (
        <>
          <S.ButtonDiv
            onClick={() => {
              setId(uniquePokemon?.id - 1);
            }}
          >
            <S.ArrowIcon $isRight={false} />
            <GS.PokemonImage
              $width="45px"
              $height="45px"
              $bgImage={
                `url(${previusPokemonIsNextOnlyIfIdIs1?.sprites.versions["generation-iv"]["diamond-pearl"].front_default})` ||
                ""
              }
            />
            <GS.PokemonName $font="title_5">
              {previusPokemonIsNextOnlyIfIdIs1?.name}
            </GS.PokemonName>
            <GS.PokemonNumber $font="paragraph_4">
              #0
              {previusPokemonIsNextOnlyIfIdIs1?.id}
            </GS.PokemonNumber>
          </S.ButtonDiv>
          <S.Divider />
        </>
      ) : null}

      <S.ButtonDiv
        onClick={() => {
          setId(uniquePokemon?.id + 1);
        }}
      >
        <GS.PokemonNumber $font="paragraph_4">
          #0
          {uniquePokemon?.id !== 1
            ? nextPokemon?.id
            : previusPokemonIsNextOnlyIfIdIs1?.id}
        </GS.PokemonNumber>
        <GS.PokemonName $font="title_5">
          {uniquePokemon?.id !== 1
            ? nextPokemon?.name
            : previusPokemonIsNextOnlyIfIdIs1?.name}
        </GS.PokemonName>
        <GS.PokemonImage
          $width="45px"
          $height="45px"
          $bgImage={
            uniquePokemon?.id !== 1
              ? `url(${nextPokemon?.sprites.versions["generation-iv"]["diamond-pearl"].front_default})` ||
                ""
              : `url(${previusPokemonIsNextOnlyIfIdIs1?.sprites.versions["generation-iv"]["diamond-pearl"].front_default})` ||
                ""
          }
        />
        <S.ArrowIcon $isRight={true} />
      </S.ButtonDiv>
    </S.Content>
  );
}
