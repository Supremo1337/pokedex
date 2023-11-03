import { KeyboardEvent } from "react";
import * as S from "./styles";

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  value: string;
  onKeyDown: (e: KeyboardEvent<Element>) => void;
}

export default function SearchBar({
  onChange = () => {},
  onClick = () => {},
  value = "",
  onKeyDown = () => {},
}: SearchBarProps) {
  return (
    <S.Container>
      <S.InputSearch
        type="search"
        placeholder="Procure o pokemon por nome ou ID..."
        onChange={onChange}
        value={value}
        name="search"
        onKeyDown={onKeyDown}
      />
      <S.Icon onClick={onClick} />
    </S.Container>
  );
}
