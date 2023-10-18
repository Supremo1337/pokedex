import { ReactNode } from "react";
import * as S from "./styles";

interface SelectProps {
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id: string;
}

export default function Select({
  children,
  onChange = () => {},
  id = "select",
}: SelectProps) {
  return (
    <S.SelectStyle onChange={onChange} id={id}>
      {children}
    </S.SelectStyle>
  );
}
