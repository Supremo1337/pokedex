import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";
import { Description, Titles, TypesGroup } from "../UniquePokemonInfo/styles";
import { useCallback, useEffect, useState } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import axios from "axios";

interface ProfileProps {
  uniquePokemon: IPokemonInfoProps;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonStats({ uniquePokemon }: ProfileProps) {
  const { loading } = usePokeApiRequest();
  const [types, setTypes] = useState<any>([]);

  const type0 = uniquePokemon.data?.types[0].type.name;
  let type1 = "";

  if (uniquePokemon.data?.types[1]) {
    type1 = uniquePokemon.data.types[1]?.type.name;
  }

  const getTypes = useCallback(async () => {
    let endpoints = [];
    if (type0) {
      // Verifica se type0 está definido
      endpoints.push(`https://pokeapi.co/api/v2/type/${type0}/`);
    }

    if (type1) {
      // Verifica se type1 está definido
      endpoints.push(`https://pokeapi.co/api/v2/type/${type1}/`);
    }

    try {
      const responses = await axios.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );
      setTypes(responses);
      console.log(responses);
    } catch (error) {
      console.error("Erro na solicitação da API:", error);
    }
  }, [type0, type1]);

  // console.log(types);

  // const compareType = () => {};

  useEffect(() => {
    if (loading) {
      getTypes();
    }
  }, [getTypes, loading]);

  return (
    <S.Content>
      <Titles $font="title_3">Habilidades</Titles>
      {uniquePokemon.data?.abilities.length !== 3 ? (
        <S.GroupCardAbility>
          {uniquePokemon.data?.abilities.map(
            (ability: { ability: { name: string } }, index: number) => {
              return (
                <S.CardAbility key={index}>
                  {ability.ability.name}
                </S.CardAbility>
              );
            }
          )}
        </S.GroupCardAbility>
      ) : (
        <S.GroupCardWith3Ability>
          {uniquePokemon.data?.abilities.map(
            (ability: { ability: { name: string } }, index: number) => {
              return (
                <S.CardAbility key={index}>
                  {ability.ability.name}
                </S.CardAbility>
              );
            }
          )}
        </S.GroupCardWith3Ability>
      )}
      <S.GroupStats>
        <S.GroupInfos>
          <Titles $font="title_3">Altura</Titles>
          <Description>{uniquePokemon.data?.height / 10} m</Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Peso</Titles>
          <Description>{uniquePokemon.data?.weight / 10} Kg</Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Fraquezas</Titles>
          {/* {types.map((type: any, index: number) => {
            return (
              <S.WeaknessCircle
                key={index}
                type={uniquePokemon.data?.types[0].type.name}
              >
                {type.data.damage_relations.double_damage_from.map(
                  (res: any) => {
                    return res.name;
                  }
                )}
              </S.WeaknessCircle>
            );
          })} */}
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Exp Base</Titles>
          <Description>{uniquePokemon.data?.base_experience} Exp</Description>
        </S.GroupInfos>
      </S.GroupStats>
    </S.Content>
  );
}
