import { theme } from "@/styles/themes";
import styled from "styled-components";
import * as S from "../CardPokemon/styles";
import { TPokemonType } from "@/interface";

interface BackgroundPokemonProps {
  type: TPokemonType;
}

export const Content = styled(S.PokemonInfo)`
  padding: 20px 0;
`;

export const GroupStats = styled.div`
  width: 327px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 1fr 1fr 1fr; */
  justify-content: space-between;
  justify-items: center;
  row-gap: 16px;
  margin-top: 12px;

  /* background-color: blue; */
`;

export const GroupCardAbility = styled.div`
  width: 327px;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  /* background-color: red; */
`;

export const GroupCardWith3Ability = styled.div`
  width: 327px;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  row-gap: 16px;

  /* background-color: red; */
`;

export const CardAbility = styled.div`
  width: 135px;
  height: 30px;
  border-radius: 16px;
  background: #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: center;
  font: ${theme.fonts.dmSans.paragraph_4};
  color: ${theme.colors.black.black_900};
`;

export const GroupInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const WeaknessesRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

export const WeaknessCircle = styled.div<BackgroundPokemonProps>`
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background-color: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  padding: 5px;
`;

export const TypeIcon = styled.div<BackgroundPokemonProps>`
  width: 20px;
  height: 100%;
  background-image: ${(props) => props?.theme?.icons?.types?.[props?.type]};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Weakness4xCircle = styled.div<BackgroundPokemonProps>`
  width: 60px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  border-radius: 20px;
  background-color: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  padding: 5px;
  gap: 6px;
`;

export const Icon4x = styled.div`
  width: 10px;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-image: url("/icon/1asterisk_icon.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;
