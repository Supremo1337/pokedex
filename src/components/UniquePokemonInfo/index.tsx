import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";

interface ProfileProps {
  selectedPokemon: IPokemonInfoProps;
  uniquePokemon: IPokemonInfoProps;
  flavorText: string;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonInfo({
  selectedPokemon,
  uniquePokemon,
  flavorText = "",
}: ProfileProps) {
  const removeEscapeCharacters = (text: string) => {
    return text
      .toString()
      .replace(/\f/g, "\n")
      .replace(/\u00ad\n/g, "")
      .replace(/\u00ad/g, "")
      .replace(/ -\n/g, " - ")
      .replace(/-\n/g, "-")
      .replace(/\n/g, " ");
  };
  return (
    <S.Content>
      <Wrapper>
        <S.BackgroundPokemon type={selectedPokemon?.data?.types[0].type.name}>
          <S.PokemonImage
            $bgImage={
              selectedPokemon?.data?.id < 650
                ? `url(${selectedPokemon.data?.sprites.other.dream_world.front_default})`
                : `url(${selectedPokemon.data?.sprites.other["official-artwork"].front_default})`
            }
          />
        </S.BackgroundPokemon>
      </Wrapper>
      <S.PokemonNumber>Nº 0{selectedPokemon.data?.id}</S.PokemonNumber>
      <S.Titles $font="title_2">{selectedPokemon.data?.name}</S.Titles>
      <S.TypesGroup>
        {selectedPokemon.data?.types[1] ? (
          <>
            <S.TypeCard type={selectedPokemon.data?.types[0].type.name}>
              {selectedPokemon.data?.types[0].type.name}
            </S.TypeCard>
            <S.TypeCard type={selectedPokemon.data?.types[1].type.name}>
              {selectedPokemon.data?.types[1].type.name}
            </S.TypeCard>
          </>
        ) : (
          <S.TypeCard type={selectedPokemon.data?.types[0].type.name}>
            {selectedPokemon.data?.types[0].type.name}
          </S.TypeCard>
        )}
      </S.TypesGroup>
      <S.Titles $font="title_3">A pokédex Diz</S.Titles>
      <S.Description>{removeEscapeCharacters(flavorText)}</S.Description>
    </S.Content>
  );
}
