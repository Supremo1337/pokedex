import styled from "styled-components";
import * as S from "./styles";
import { TypesGroup } from "../UniquePokemonInfo/styles";
import { useCallback, useEffect, useState, ReactNode } from "react";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";
import axios from "axios";
import * as GS from "@/styles/globalStyles";
import { ProfileProps } from "@/interface";

const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonStats() {
  const { loading, uniquePokemon } = usePokeApiRequest();
  const [types, setTypes] = useState<any>([]);
  const [weaknessOfPokemon, setWeaknessOfPokemon] = useState<any[]>([]);
  const [weaknessOfPokemon4x, setWeaknessOfPokemon4x] = useState<any[]>([]);

  const type0 = uniquePokemon?.types[0].type.name;
  let type1 = "";

  if (uniquePokemon?.types[1]) {
    type1 = uniquePokemon?.types[1]?.type.name;
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
  // console.log(`Tipo ${uniquePokemon?.data?.types[0]?.type.name}`, type0Data);
  // console.log(`Tipo ${uniquePokemon?.data?.types[1]?.type.name}`, type1Data);

  interface DamageRelations {
    double_damage_from: Array<{ name: string }>;
    double_damage_to: Array<{ name: string }>;
    half_damage_from: Array<{ name: string }>;
    half_damage_to: Array<{ name: string }>;
    no_damage_from: Array<{ name: string }>;
    no_damage_to: Array<{ name: string }>;
  }

  const getPokemonWeakness = useCallback(() => {
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
        // Adicionar fraquezas comuns às fraquezas únicas
        setWeaknessOfPokemon((prevWeaknesses) => [...prevWeaknesses]);
        setWeaknessOfPokemon4x(commonWeaknesses);

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
      getPokemonWeakness();
    }
  }, [type1Data, getPokemonWeakness]);

  return (
    <S.Content>
      <GS.Titles $font="title_3">Habilidades</GS.Titles>
      {uniquePokemon?.abilities.length !== 3 ? (
        <S.GroupCardAbility>
          {uniquePokemon?.abilities.map(
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
          {uniquePokemon?.abilities.map(
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
          <GS.Titles $font="title_3">Altura</GS.Titles>
          <GS.Description>{uniquePokemon?.height / 10} m</GS.Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <GS.Titles $font="title_3">Peso</GS.Titles>
          <GS.Description>{uniquePokemon?.weight / 10} Kg</GS.Description>
        </S.GroupInfos>
        <S.GroupInfos>
          <GS.Titles $font="title_3">Fraquezas</GS.Titles>

          <S.WeaknessesRow>
            {type1Data ? (
              <>
                {weaknessOfPokemon.map((weakness: any, index: number) => {
                  return (
                    <S.WeaknessCircle
                      title={weakness}
                      type={weakness}
                      key={index}
                    >
                      <S.TypeIcon type={weakness} />
                    </S.WeaknessCircle>
                  );
                })}
                {weaknessOfPokemon4x.map((commonWeakness, index: number) => {
                  return (
                    <S.Weakness4xCircle type={commonWeakness} key={index}>
                      <S.TypeIcon
                        title={commonWeakness}
                        type={commonWeakness}
                      />
                      <S.Icon4x title="4x Damage" />
                    </S.Weakness4xCircle>
                  );
                })}
              </>
            ) : (
              <>
                {type0Data?.double_damage_from.map(
                  (type: any, index: number) => {
                    return (
                      <S.WeaknessCircle
                        title={type.name}
                        type={type.name}
                        key={index}
                      >
                        <S.TypeIcon type={type.name} />
                      </S.WeaknessCircle>
                    );
                  }
                )}
              </>
            )}
          </S.WeaknessesRow>
        </S.GroupInfos>
        <S.GroupInfos>
          <GS.Titles $font="title_3">Exp Base</GS.Titles>
          <GS.Description>{uniquePokemon?.base_experience} Exp</GS.Description>
        </S.GroupInfos>
      </S.GroupStats>
    </S.Content>
  );
}
