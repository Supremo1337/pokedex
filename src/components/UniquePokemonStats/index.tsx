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
  const [weaknessOfPokemon, setWeaknessOfPokemon] = useState<any>([]);

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
  console.log(`Tipo ${uniquePokemon?.data.types[0].type.name}`, type0Data);
  console.log(`Tipo ${uniquePokemon?.data.types[1].type.name}`, type1Data);

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

  const propertiesToCompare = [
    "double_damage_from",
    "double_damage_to",
    "half_damage_from",
    "half_damage_to",
    "no_damage_from",
    "no_damage_to",
  ];

  // console.log(type0Data?.double_damage_from);
  // console.log(type1Data?.double_damage_to);
  const compareType = () => {
    const weakness: string[] = [];
    for (const property0 of propertiesToCompare) {
      for (const property1 of propertiesToCompare) {
        let array0 =
          type0Data?.[property0].map((type: any) => type.name || []) || [];
        let array1 =
          type1Data?.[property1].map((type: any) => type.name || []) || [];
        if (
          property0 === "double_damage_from" &&
          property1 === "double_damage_from"
        ) {
          let commonWeaknessesForTypes = array0.filter((item: any) =>
            array1.includes(item)
          );
          // Encontra palavras comuns entre as duas listas
          // Adiciona as palavras comuns à lista weakness
          weakness.push(commonWeaknessesForTypes);
          console.log(weakness);
        }
        if (
          property0 === "double_damage_from" &&
          (property1 === "double_damage_to" || property1 === "half_damage_from")
        ) {
          // se alguma palavra se repetir ele não faz nada,
          // se não se repetir ele adiciona a palavra do array0
          // ao array de fraquezas
          let commonWeaknessesForTypesTo = array0.filter((item: any) =>
            array1.includes(item)
          );
          if (commonWeaknessesForTypesTo.length > 0) {
            console.log("a palavra se repetiu:", commonWeaknessesForTypesTo);
            console.log("não faz nada");
          } else {
            console.log("a palavra não se repetiu");
            console.log("Adiciona as palavras do array 0 ao array de weakness");
            if (
              array0.filter((item: any) => !weakness.includes(item)).length > 0
            ) {
              weakness.push(...array0);
            }
          }
        }
        // if (
        //   property0 === "double_damage_from" &&
        //   property1 === "half_damage_to"
        // ) {
        // }

        // if (
        //   property0 === "double_damage_from" &&
        //   property1 === "no_damage_from"
        // ) {
        //   let commonWeaknessesForTypesdouble_damage_fromAndno_damage_from =
        //     array0.filter((item: any) => !array1.includes(item));
        //   if (
        //     commonWeaknessesForTypesdouble_damage_fromAndno_damage_from.length >
        //     0
        //   ) {
        //     weakness.push(
        //       ...commonWeaknessesForTypesdouble_damage_fromAndno_damage_from
        //     );
        //   }
        //   // commonWeaknessesForTypesdouble_damage_fromAndno_damage_from;
        //   console.log("TESTEEE", weakness);
        // }

        // const array0Filtered = array0.filter(
        //   (typeName: any) => !commmomTypeName.includes(typeName)
        // );

        // if (commmomTypeName.length > 0) {
        //   console.log(
        //     `O Tipo "${uniquePokemon?.data.types[0].type.name}" toma ${property0} dos tipos: "${commmomTypeName}", mas o "${uniquePokemon?.data.types[1].type.name}" toma ${property1}`
        //   );
        // }
        // console.log(array0Filtered);
      }
    }
    weakness.forEach((element, index) => {
      if (Array.isArray(element)) {
        weakness[index] = element.join(", ");
      }
    });
    setWeaknessOfPokemon(weakness);
  };

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
          <button type="button" onClick={() => compareType()}>
            Compare TYpes
          </button>
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
          {weaknessOfPokemon.map((weakness: any, index: number) => {
            return (
              <S.WeaknessCircle type={weakness} key={index}>
                {weakness}
              </S.WeaknessCircle>
            );
          })}
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Exp Base</Titles>
          <Description>{uniquePokemon.data?.base_experience} Exp</Description>
        </S.GroupInfos>
      </S.GroupStats>
    </S.Content>
  );
}
