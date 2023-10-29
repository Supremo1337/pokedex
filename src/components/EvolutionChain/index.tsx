import * as GS from "@/styles/globalStyles";
import * as S from "./styles";
import { Fragment, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import { IPokemonInfoProps } from "@/interface";

interface EvolutionChainProps {
  uniquePokemon: IPokemonInfoProps;
  evolutionChain: IPokemonInfoProps;
  pokemonEvolution: [];
}

export default function EvolutionChain({
  uniquePokemon,
  evolutionChain,
  pokemonEvolution,
}: EvolutionChainProps) {
  const evolutionTrigger1 = evolutionChain.data?.chain?.evolves_to[0];
  const evolutionTrigger2 =
    evolutionChain.data?.chain.evolves_to[0]?.evolves_to[0];

  // console.log(
  //   "AQQQ",
  //   evolutionChain.data?.chain.evolves_to[0].evolution_details[0].trigger.name
  // );
  return (
    <S.Content>
      <GS.Titles $font="title_3">Evoluções</GS.Titles>
      <S.EvolutionGroup>
        {Array.isArray(pokemonEvolution) ? (
          <>
            {pokemonEvolution.map((url: any, index: number) => {
              return (
                <Fragment key={index}>
                  <GS.PokemonImage
                    $width="45px"
                    $height="59px"
                    $bgImage={`url(${url})`}
                  />
                  {index === 0 && evolutionTrigger1 ? (
                    <GS.Description>
                      {
                        evolutionChain.data?.chain?.evolves_to[0]
                          .evolution_details[0].trigger.name
                      }
                    </GS.Description>
                  ) : null}
                  {index === 1 && evolutionTrigger2 ? (
                    <GS.Description>
                      {
                        evolutionChain.data?.chain.evolves_to[0].evolves_to[0]
                          .evolution_details[0].trigger.name
                      }
                    </GS.Description>
                  ) : null}
                </Fragment>
              );
            })}
          </>
        ) : null}
      </S.EvolutionGroup>
    </S.Content>
  );
}
