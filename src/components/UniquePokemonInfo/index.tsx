import styled from "styled-components";
import * as S from "./styles";
import * as GS from "@/styles/globalStyles";
import { IPokemonInfoProps } from "@/interface";
import { usePokeApiRequest } from "../contexts/pokeApiRequestContext";

interface ProfileProps {
  flavorText: string;
}
const Wrapper = styled.div`
  /* background-color: blue; */
  height: 191px;
`;

export default function UniquePokemonInfo({ flavorText = "" }: ProfileProps) {
  const { uniquePokemon } = usePokeApiRequest();
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
        <S.BackgroundPokemon type={uniquePokemon.types[0].type.name}>
          <S.PokemonImage
            $bgImage={
              uniquePokemon.id < 650
                ? `url(${uniquePokemon.sprites.other.dream_world.front_default} )` ||
                  ""
                : uniquePokemon.id !== 1013
                ? `url(${uniquePokemon.sprites.other?.["official-artwork"]?.front_default})` ||
                  ""
                : `url(${uniquePokemon?.sprites.front_default})` || ""
            }
          />
        </S.BackgroundPokemon>
      </Wrapper>
      <GS.PokemonNumber $font="paragraph_2">
        Nº 0{uniquePokemon.id}
      </GS.PokemonNumber>
      <GS.Titles $font="title_2">{uniquePokemon.name}</GS.Titles>

      <S.TypesGroup>
        {uniquePokemon.types.map((type, index: number) => {
          return (
            <GS.TypeCard key={index} type={type.type.name}>
              {type.type.name}
            </GS.TypeCard>
          );
        })}
      </S.TypesGroup>
      <GS.Titles $font="title_3">A pokédex Diz</GS.Titles>
      <GS.Description>{removeEscapeCharacters(flavorText)}</GS.Description>
    </S.Content>
  );
}
