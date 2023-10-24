import styled from "styled-components";
import * as S from "../CardPokemon/styles";
import { theme } from "@/styles/themes";

interface TitlesProps {
  $font: string;
}

export const Content = styled(S.PokemonInfo)`
  position: relative;
`;
export const BackgroundPokemon = styled(S.BackgroundPokemon)`
  width: 134px;
  height: 134px;
  position: relative;
`;
export const PokemonImage = styled(S.PokemonImage)`
  position: absolute;
  width: 126%;
  height: 126%;
  top: 20px;
`;
export const PokemonNumber = styled(S.PokemonNumber)`
  font: ${theme.fonts.dmSans.paragraph_4};
  color: ${theme.colors.gray.gray_800};
`;
export const Titles = styled(S.PokemonName)<TitlesProps>`
  font: ${({ $font }) => theme.fonts.poppins[$font]};
  color: ${theme.colors.black.black_700};
`;

export const TypesGroup = styled(S.TypesGroup)`
  flex-direction: row;
  gap: 12px;
`;

export const TypeCard = styled(S.TypeCard)``;

export const Description = styled.div`
  /* width: 327px; */
  font: ${theme.fonts.dmSans.paragraph_3};
  color: ${theme.colors.gray.gray_700};
  text-align: center;
`;
