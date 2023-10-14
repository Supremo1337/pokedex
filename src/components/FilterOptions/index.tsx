import * as S from "./styles";
import { SelectMain } from "../SelectComponent";
import { SelectIcon, SelectOption } from "../SelectComponent/styles";
import { useState } from "react";

interface FilterOptionsProps {
  onChangeType?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeHeight?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeWeight?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FilterOptions({
  onChangeType = () => {},
  onChangeHeight = () => {},
  onChangeWeight = () => {},
}: FilterOptionsProps) {
  return (
    <S.Container>
      <SelectMain.Root>
        <SelectIcon icon="dittoicon" />
        <SelectMain.Select onChange={onChangeType}>
          <SelectOption>Tipo</SelectOption>
          <SelectOption value="bug">bug</SelectOption>
          <SelectOption value="dark">dark</SelectOption>
          <SelectOption value="dragon">dragon</SelectOption>
          <SelectOption value="eletric">eletric</SelectOption>
          <SelectOption value="fairy">fairy</SelectOption>
          <SelectOption value="fighting">fighting</SelectOption>
          <SelectOption value="fire">fire</SelectOption>
          <SelectOption value="flying">flying</SelectOption>
          <SelectOption value="ghost">ghost</SelectOption>
          <SelectOption value="grass">grass</SelectOption>
          <SelectOption value="ground">ground</SelectOption>
          <SelectOption value="ice">ice</SelectOption>
          <SelectOption value="normal">normal</SelectOption>
          <SelectOption value="poison">poison</SelectOption>
          <SelectOption value="psychic">psychic</SelectOption>
          <SelectOption value="rock">rock</SelectOption>
          <SelectOption value="steel">steel</SelectOption>
          <SelectOption value="water">water</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon icon="dratiniicon" />
        <SelectMain.Select onChange={onChangeHeight}>
          <SelectOption>Altura</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon icon="snorlaxicon" />
        <SelectMain.Select onChange={onChangeWeight}>
          <SelectOption>Peso</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
    </S.Container>
  );
}
