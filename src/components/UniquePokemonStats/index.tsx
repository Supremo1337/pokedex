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
      endpoints.push(`https://pokeapi.co/api/v2/type/${type0}/`);
    }

    if (type1) {
      endpoints.push(`https://pokeapi.co/api/v2/type/${type1}/`);
    }

    const responses = await axios
      .all(endpoints.map((endpoint) => axios.get(endpoint)))
      .then((res) => {
        setTypes(res);
      });
  }, [type0, type1]);

  const type0Data = types[0]?.data.damage_relations;
  const type1Data = types[1]?.data.damage_relations;
  // console.log(types);
  console.log("Tipo 0:", type0Data);
  console.log("Tipo 1:", type1Data);

  interface DamageRelations {
    double_damage_from: Array<{ name: string }>;
    double_damage_to: Array<{ name: string }>;
    half_damage_from: Array<{ name: string }>;
    half_damage_to: Array<{ name: string }>;
    no_damage_from: Array<{ name: string }>;
    no_damage_to: Array<{ name: string }>;
  }

  const getTypeOfDamage = useCallback(
    (typeData: any, damageTypeName: string) => {
      return typeData?.[damageTypeName].map((type: any) => type.name);
    },
    []
  );

  console.log(type0Data?.double_damage_from);
  console.log(type1Data?.double_damage_to);
  const compareType = useCallback(() => {
    const Type0doubleDamageFrom = getTypeOfDamage(
      type0Data,
      "double_damage_from"
    );
    const Type0doubleDamageTo = getTypeOfDamage(type0Data, "double_damage_to");
    const Type0halfDamageFrom = getTypeOfDamage(type0Data, "half_damage_from");
    const Type0halfDamageTo = getTypeOfDamage(type0Data, "half_damage_to");
    const Type0noDamageFrom = getTypeOfDamage(type0Data, "no_damage_from");
    const Type0noDamageTo = getTypeOfDamage(type0Data, "no_damage_to");
    const Type1doubleDamageFrom = getTypeOfDamage(
      type1Data,
      "double_damage_from"
    );
    const Type1doubleDamageTo = getTypeOfDamage(type1Data, "double_damage_to");
    const Type1halfDamageFrom = getTypeOfDamage(type1Data, "half_damage_from");
    const Type1halfDamageTo = getTypeOfDamage(type1Data, "half_damage_to");
    const Type1noDamageFrom = getTypeOfDamage(type1Data, "no_damage_from");
    const Type1noDamageTo = getTypeOfDamage(type1Data, "no_damage_to");
    if (Type0doubleDamageFrom && Type1doubleDamageTo) {
      for (const typeNameIgual of Type0doubleDamageFrom) {
        if (Type1doubleDamageFrom.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1doubleDamageFrom`
          );
        }
        if (Type1doubleDamageTo.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1doubleDamageTo`
          );
        }
        if (Type1halfDamageFrom.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1halfDamageFrom`
          );
        }
        if (Type1halfDamageTo.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1halfDamageTo`
          );
        }
        if (Type1noDamageFrom.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1noDamageFrom`
          );
        }
        if (Type1noDamageTo.includes(typeNameIgual)) {
          console.log(
            `${typeNameIgual} is present in Type0doubleDamageFrom and Type1noDamageTo`
          );
        }
      }
    }
  }, [getTypeOfDamage, type0Data, type1Data]);

  useEffect(() => {
    if (loading) {
      getTypes();
    }
  }, [getTypes, loading]);

  useEffect(() => {
    if (loading) {
      compareType();
    }
  }, [loading, compareType]);

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
