import { TPokemonType } from "@/interface";
import { BackgroundPokemonProps } from "@/styles/globalStyles";
import { theme } from "@/styles/themes";
import styled from "styled-components";

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

export const TypesGroup = styled.div`
  height: 56px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
`;

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  /* min-height: 100vh; */
`;

export const WrapperProfileComponent = styled.div`
  width: 327px;
  height: 862px;
  box-shadow: 0px 4px 4px 0px rgb(0 0 0 / 10%);
  border-radius: 8px;
`;
