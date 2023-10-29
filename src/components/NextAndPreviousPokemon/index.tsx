import { ProfileProps } from "@/interface";
import * as S from "./styles";
import * as GS from "@/styles/globalStyles";

export default function NextAndPreviousPokemon({
  uniquePokemon,
}: ProfileProps) {
  return (
    <S.Content>
      <S.ArrowIcon $icon="CaretLeft" />
      <GS.PokemonImage
        $width="25px"
        $height="25px"
        $bgImage={`url(/icon/dittoicon.svg)` || ""}
      />
      <GS.Titles $font="title_5">Riolu</GS.Titles>
    </S.Content>
  );
}
