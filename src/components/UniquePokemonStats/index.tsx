import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";
import { Description, Titles, TypesGroup } from "../UniquePokemonInfo/styles";
import { useCallback, useEffect, useState, ReactNode } from "react";
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
  const [weaknessOfPokemon, setWeaknessOfPokemon] = useState<ReactNode[]>([]);

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
  console.log(`Tipo ${uniquePokemon?.data?.types[0]?.type.name}`, type0Data);
  console.log(`Tipo ${uniquePokemon?.data?.types[1]?.type.name}`, type1Data);

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

  const compareType = useCallback(() => {
    if (type0Data && type1Data) {
      const weaknessType0: string[] = type0Data?.double_damage_from.map(
        (type: any) => type.name
      );
      const resistancesDoubleType0: string[] = type0Data?.double_damage_to.map(
        (type: any) => type.name
      );
      const resistancesHalfType0: string[] = type0Data?.half_damage_from.map(
        (type: any) => type.name
      );
      const noDamageType0: string[] = type0Data?.no_damage_from.map(
        (type: any) => type.name
      );
      const weaknessType1: string[] = type1Data?.double_damage_from.map(
        (type: any) => type.name
      );
      const resistancesDoubleType1: string[] = type1Data?.double_damage_to.map(
        (type: any) => type.name
      );
      const resistancesHalfType1: string[] = type1Data?.half_damage_from.map(
        (type: any) => type.name
      );
      const noDamageType1: string[] = type1Data?.no_damage_from.map(
        (type: any) => type.name
      );

      const resistancesType0: string[] = [
        ...new Set(
          resistancesDoubleType0
            .concat(resistancesHalfType0)
            .concat(noDamageType0)
        ),
      ];

      const resistancesType1: string[] = [
        ...new Set(
          resistancesDoubleType1
            .concat(resistancesHalfType1)
            .concat(noDamageType1)
        ),
      ];

      const reallyWeaknessType0: string[] = weaknessType0.filter(
        (item: any) => !resistancesType1.includes(item)
      );

      const reallyWeaknessType1: string[] = weaknessType1.filter(
        (item: any) => !resistancesType0.includes(item)
      );

      const commonWeaknesses = reallyWeaknessType0.filter((item: any) =>
        reallyWeaknessType1.includes(item)
      );

      setWeaknessOfPokemon(reallyWeaknessType0.concat(reallyWeaknessType1));
      if (commonWeaknesses.length > 0) {
        // Remover fraquezas comuns das fraquezas individuais
        const uniqueWeaknesses = reallyWeaknessType0
          .concat(reallyWeaknessType1)
          .filter((item, index, self) => self.indexOf(item) === index);

        // Criar elementos com a notação "4x" apenas para as fraquezas comuns
        const commonWeaknessElements = commonWeaknesses.map(
          (commonWeakness) => (
            <div key={commonWeakness}>
              {commonWeakness} <span>4x</span>
            </div>
          )
        );

        // Adicionar fraquezas comuns às fraquezas únicas
        setWeaknessOfPokemon((prevWeaknesses) => [
          ...prevWeaknesses,
          ...commonWeaknessElements,
        ]);

        // Remover as fraquezas comuns das fraquezas únicas
        setWeaknessOfPokemon((prevWeaknesses) =>
          prevWeaknesses.filter(
            (weakness) => !commonWeaknesses.includes(weakness)
          )
        );
      }
    }
  }, [type0Data, type1Data]);

  useEffect(() => {
    if (loading) {
      getTypes();
    }
  }, [getTypes, loading]);

  useEffect(() => {
    if (type1Data) {
      compareType();
    }
  }, [type1Data, compareType]);

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
          <S.WeaknessesRow>
            {type1Data ? (
              <>
                {weaknessOfPokemon.map((weakness: any, index: number) => {
                  return (
                    <S.WeaknessCircle type={weakness} key={index}>
                      {weakness}
                    </S.WeaknessCircle>
                  );
                })}
              </>
            ) : (
              <>
                {type0Data?.double_damage_from.map(
                  (type: any, index: number) => {
                    return (
                      <S.WeaknessCircle type={type.name} key={index}>
                        {type.name}
                      </S.WeaknessCircle>
                    );
                  }
                )}
              </>
            )}
          </S.WeaknessesRow>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Exp Base</Titles>
          <Description>{uniquePokemon.data?.base_experience} Exp</Description>
        </S.GroupInfos>
      </S.GroupStats>
    </S.Content>
  );
}
