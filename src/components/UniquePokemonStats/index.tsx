import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";
import { Description, Titles, TypesGroup } from "../UniquePokemonInfo/styles";
import { useCallback, useEffect, useState } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import axios from "axios";

interface ProfileProps {
  selectedPokemon: IPokemonInfoProps;
  uniquePokemon: IPokemonInfoProps;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonStats({ selectedPokemon }: ProfileProps) {
  const { loading } = usePokeApiRequest();
  const [types, setTypes] = useState<any>([]);

  const getTypes = useCallback(async () => {
    const type0 = selectedPokemon.data?.types[0].type.name;
    const type1 = selectedPokemon.data?.types[1].type.name;
    let endpoints = [
      `https://pokeapi.co/api/v2/type/${type0}/`,
      `https://pokeapi.co/api/v2/type/${type1}/`,
    ];
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => {
      setTypes(res);
      console.log(res[0].data.damage_relations.double_damage_from[0].name);
    });
  }, [selectedPokemon.data?.types]);

  console.log(types[1]?.data.damage_relations.double_damage_from);
  const compareType = () => {};

  useEffect(() => {
    if (loading) {
      getTypes();
    }
  }, [getTypes, loading]);

  return (
    <S.Content>
      <Titles $font="title_3">Habilidades</Titles>
      <S.GroupCardCardAbility>
        {selectedPokemon.data?.abilities.map(
          (ability: { ability: { name: string } }, index: number) => {
            return (
              <S.CardAbility key={index}>{ability.ability.name}</S.CardAbility>
            );
          }
        )}
        <S.GroupInfos>
          <Titles $font="title_3">Altura</Titles>
          <Description>{selectedPokemon.data?.height / 10}m</Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Peso</Titles>
          <Description>{selectedPokemon.data?.weight / 10}Kg</Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Fraquezas</Titles>
          {/* {types.map((type: any, index: number) => {
            return (
              <S.WeaknessCircle
                key={index}
                type={selectedPokemon.data?.types[0].type.name}
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
          <Description>{selectedPokemon.data?.base_experience} Exp</Description>
        </S.GroupInfos>
      </S.GroupCardCardAbility>
    </S.Content>
  );
}
