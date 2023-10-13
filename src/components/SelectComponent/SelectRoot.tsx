import { ReactNode } from "react";
import * as S from "./styles";

interface SelectRootProps {
  children: ReactNode;
}

export default function SelectRoot({ children }: SelectRootProps) {
  return <S.Container>{children}</S.Container>;
}
