import { ReactNode } from "react";
import * as S from "./styles";

interface SelectProps {
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ children, onChange = () => {} }: SelectProps) {
  return <S.SelectStyle onChange={onChange}>{children}</S.SelectStyle>;
}
