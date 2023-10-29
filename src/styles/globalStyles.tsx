import { createGlobalStyle } from "styled-components";
import { theme } from "./themes";
import styled from "styled-components";
import { TPokemonType } from "@/interface";
import * as CPS from "@/components/CardPokemon/styles";

export interface PokemonImageProps {
  $bgImage: string;
  $width?: string;
  $height?: string;
}

export interface BackgroundPokemonProps {
  type: TPokemonType;
}

interface TitlesProps {
  $font: string;
}

export const Globaltyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Poppins";
}

html{
  background: ${theme.colors.white.white_900};
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  padding: 24px 12px;
  font-size: 62.5%;

  @media (min-width: 1024px) {
    padding: 30px 80px;
  }
  @media (min-width: 1366px) {
    padding: 30px 128px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
`;

export const TypeCard = styled.div<BackgroundPokemonProps>`
  width: 80px;
  height: 23px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font: ${theme.fonts.dmSans.paragraph_4};
  color: ${theme.colors.black.black_900};
  border-radius: 4px;
  background: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
`;

export const Description = styled.div`
  /* width: 327px; */
  font: ${theme.fonts.dmSans.paragraph_3};
  color: ${theme.colors.gray.gray_700};
  text-align: center;
  text-transform: capitalize;
`;

export const Titles = styled(CPS.PokemonName)<TitlesProps>`
  font: ${({ $font }) => theme.fonts.poppins[$font]};
  color: ${theme.colors.black.black_700};
`;

export const PokemonImage = styled.div<PokemonImageProps>`
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  /* width: 85%;
  height: 85%; */

  background-image: ${(props) => props.$bgImage};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
