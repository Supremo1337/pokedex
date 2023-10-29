import styled from "styled-components";
import * as S from "../CardPokemon/styles";
import { theme } from "@/styles/themes";
import * as GS from "@/styles/globalStyles";

export const Content = styled(S.PokemonInfo)`
  position: relative;
`;
export const BackgroundPokemon = styled(S.BackgroundPokemon)`
  width: 134px;
  height: 134px;
  position: relative;
`;
export const PokemonImage = styled(GS.PokemonImage)`
  position: absolute;
  width: 126%;
  height: 126%;
  top: 20px;
`;
export const PokemonNumber = styled(S.PokemonNumber)`
  font: ${theme.fonts.dmSans.paragraph_4};
  color: ${theme.colors.gray.gray_800};
`;

export const TypesGroup = styled(S.TypesGroup)`
  flex-direction: row;
  gap: 12px;
`;
