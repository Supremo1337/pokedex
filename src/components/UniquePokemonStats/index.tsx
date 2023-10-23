import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";
import { Description, Titles, TypesGroup } from "../UniquePokemonInfo/styles";

interface ProfileProps {
  selectedPokemon: IPokemonInfoProps;
  uniquePokemon: IPokemonInfoProps;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonStats({ selectedPokemon }: ProfileProps) {
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
          <S.WeaknessCircle
            type={selectedPokemon.data?.types[0].type.name}
          ></S.WeaknessCircle>
        </S.GroupInfos>
        <S.GroupInfos>
          <Titles $font="title_3">Exp Base</Titles>
          <Description>{selectedPokemon.data?.base_experience} Exp</Description>
        </S.GroupInfos>
      </S.GroupCardCardAbility>
    </S.Content>
  );
}
