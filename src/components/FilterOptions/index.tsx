import * as S from "./styles";
import { SelectMain } from "../SelectComponent";
import { SelectIcon, SelectOption } from "../SelectComponent/styles";
import { useState } from "react";
import { TypeIcon } from "../UniquePokemonStats/styles";

interface FilterOptionsProps {
  onChangeType?: (type: string) => void;
  onChangeHeight?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChangeWeight?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const types = [
  { typeName: "bug" },
  { typeName: "dark" },
  { typeName: "dragon" },
  { typeName: "electric" },
  { typeName: "fairy" },
  { typeName: "fighting" },
  { typeName: "fire" },
  { typeName: "flying" },
  { typeName: "ghost" },
  { typeName: "grass" },
  { typeName: "ground" },
  { typeName: "ice" },
  { typeName: "normal" },
  { typeName: "poison" },
  { typeName: "psychic" },
  { typeName: "rock" },
  { typeName: "steel" },
  { typeName: "water" },
];

export default function FilterOptions({
  onChangeType = () => {},
  onChangeHeight = () => {},
  onChangeWeight = () => {},
}: FilterOptionsProps) {
  return (
    <S.Container>
      <SelectMain.Root>
        <SelectIcon $icon="dittoicon" />
        <SelectMain.Select
          id="selectType"
          onChange={(e) => onChangeType(e.target.value)}
        >
          <SelectOption value="type">Tipo</SelectOption>
          {types.map((type: any, index) => {
            return (
              <SelectOption key={index} value={type.typeName}>
                {type.typeName}
              </SelectOption>
            );
          })}
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon $icon="dratiniicon" />
        <SelectMain.Select id="selectHeight" onChange={onChangeHeight}>
          <SelectOption>Altura</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon $icon="snorlaxicon" />
        <SelectMain.Select id="selectWeight" onChange={onChangeWeight}>
          <SelectOption>Peso</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
    </S.Container>
  );
}
