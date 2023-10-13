import * as S from "./styles";

export default function SearchBar() {
  return (
    <S.Container>
      <S.InputSearch type="search" placeholder="Pesquise o pokémon..." />
      <S.Icon />
    </S.Container>
  );
}
