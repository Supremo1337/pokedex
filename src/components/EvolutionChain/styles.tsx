import styled from "styled-components";
import * as CPS from "../CardPokemon/styles";

export const Content = styled(CPS.PokemonInfo)``;

export const EvolutionGroup = styled.div`
  width: 310px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
`;

export const EvolutionPokemonImage = styled(CPS.PokemonImage)`
  width: 45px;
  height: 59px;
  /* background: Red; */
`;
