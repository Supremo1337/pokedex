import * as S from "./styles";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: any;
  value: string;
}

export default function SearchBar({
  onChange = () => {},
  onClick = () => {},
  value = "",
}: SearchBarProps) {
  return (
    <S.Container>
      <S.InputSearch
        type="search"
        placeholder="Procure o pokemon por nome ou ID..."
        onChange={onChange}
        value={value}
        name="search"
      />
      <S.Icon onClick={onClick} />
    </S.Container>
  );
}
