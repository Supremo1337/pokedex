import { ReactNode } from "react";
import * as S from "./styles";

interface SelectProps {
  children: ReactNode;
}

export default function Select({ children }: SelectProps) {
  return <S.SelectStyle>{children}</S.SelectStyle>;
}
