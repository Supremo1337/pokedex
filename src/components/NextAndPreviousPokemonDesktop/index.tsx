import { IPokemonInfoProps, ProfileProps } from "@/interface";
import * as S from "./styles";
import * as GS from "@/styles/globalStyles";
import { useEffect, useState } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import Link from "next/link";

export default function NextAndPreviousPokemon() {
  const { previusAndNextPokemon, uniquePokemon, id, setId } =
    usePokeApiRequest();
  const previusPokemonIsNextOnlyIfIdIs1 = previusAndNextPokemon?.[0]?.data;
  const nextPokemon = previusAndNextPokemon?.[1]?.data;
  // console.log("NEXT AQ PORRA NO COMPONENT", previusPokemonIsNextOnlyIfIdIs1);
  return (
    <S.Content>
      {uniquePokemon.data?.id !== 1 ? (
        <>
          <Link href={`/profile/${uniquePokemon.data?.id - 1}`}>
            <S.ButtonDiv>
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
          </Link>
          <S.Divider />
        </>
      ) : null}

      <Link href={`/profile/${uniquePokemon.data?.id + 1}`}>
        <S.ButtonDiv>
          <GS.PokemonNumber $font="paragraph_4">
            #0
            {uniquePokemon.data?.id !== 1
              ? nextPokemon?.id
              : previusPokemonIsNextOnlyIfIdIs1?.id}
          </GS.PokemonNumber>
          <GS.PokemonName $font="title_5">
            {uniquePokemon.data?.id !== 1
              ? nextPokemon?.name
              : previusPokemonIsNextOnlyIfIdIs1?.name}
          </GS.PokemonName>
          <GS.PokemonImage
            $width="45px"
            $height="45px"
            $bgImage={
              uniquePokemon.data?.id !== 1
                ? `url(${nextPokemon?.sprites.versions["generation-iv"]["diamond-pearl"].front_default})` ||
                  ""
                : `url(${previusPokemonIsNextOnlyIfIdIs1?.sprites.versions["generation-iv"]["diamond-pearl"].front_default})` ||
                  ""
            }
          />
          <S.ArrowIcon $isRight={true} />
        </S.ButtonDiv>
      </Link>
    </S.Content>
  );
}
