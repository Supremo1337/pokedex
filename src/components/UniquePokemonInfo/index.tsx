import styled from "styled-components";
import { IPokemonInfoProps } from "../CardPokemon";
import * as S from "./styles";

interface ProfileProps {
  uniquePokemon: IPokemonInfoProps;
  flavorText: string;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonInfo({
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
        <S.BackgroundPokemon type={uniquePokemon?.data?.types[0].type.name}>
          <S.PokemonImage
            $bgImage={
              uniquePokemon?.data?.id < 650
                ? `url(${uniquePokemon.data?.sprites.other.dream_world.front_default})`
                : `url(${uniquePokemon.data?.sprites.other["official-artwork"].front_default})`
            }
          />
        </S.BackgroundPokemon>
      </Wrapper>
      <S.PokemonNumber>Nº 0{uniquePokemon.data?.id}</S.PokemonNumber>
      <S.Titles $font="title_2">{uniquePokemon.data?.name}</S.Titles>

      <S.TypesGroup>
        {uniquePokemon.data?.types.map((type: any, index: number) => {
          return (
            <S.TypeCard key={index} type={type.type.name}>
              {type.type.name}
            </S.TypeCard>
          );
        })}
      </S.TypesGroup>
      <S.Titles $font="title_3">A pokédex Diz</S.Titles>
      <S.Description>{removeEscapeCharacters(flavorText)}</S.Description>
    </S.Content>
  );
}
