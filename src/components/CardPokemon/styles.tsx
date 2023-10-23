import { TPokemonType } from "@/interface";
import { theme } from "@/styles/themes";
import styled from "styled-components";

interface PokemonImageProps {
  $bgImage: string;
}

interface BackgroundPokemonProps {
  type: TPokemonType;
}

export const Content = styled.div`
  width: 156px;
  height: 253px;

  margin-top: 28px;
  padding: 14px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  background: #fff;
`;

export const PokemonInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const BackgroundPokemon = styled.div<BackgroundPokemonProps>`
  width: 84px;
  height: 84px;
  background: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PokemonNumber = styled.p`
  font: ${theme.fonts.dmSans.paragraph_2};
  color: ${theme.colors.gray.gray_800};
`;

export const PokemonName = styled.p`
  text-transform: capitalize;
  font: ${theme.fonts.poppins.title_4};
  color: ${theme.colors.black.black_700};
`;

export const TypesGroup = styled.div`
  height: 56px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const TypeCard = styled.div<BackgroundPokemonProps>`
  width: 80px;
  height: 23px;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  font: ${theme.fonts.dmSans.paragraph_2};
  color: ${theme.colors.black.black_900};
  border-radius: 4px;
  background: ${(props) => props?.theme?.colors?.types?.[props?.type]};
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
  text-transform: capitalize;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  /* min-height: 100vh; */
`;

export const PokemonImage = styled.div<PokemonImageProps>`
  width: 85%;
  height: 85%;
  background-image: ${(props) => props.$bgImage};
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;
