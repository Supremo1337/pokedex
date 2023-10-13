import * as S from "./styles";
import { SelectMain } from "../SelectComponent";
import { SelectIcon, SelectOption } from "../SelectComponent/styles";

export default function FilterOptions() {
  return (
    <S.Container>
      <SelectMain.Root>
        <SelectIcon icon="dittoicon" />
        <SelectMain.Select>
          <SelectOption>Tipo</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon icon="dratiniicon" />
        <SelectMain.Select>
          <SelectOption>Altura</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
      <SelectMain.Root>
        <SelectIcon icon="snorlaxicon" />
        <SelectMain.Select>
          <SelectOption>Peso</SelectOption>
        </SelectMain.Select>
      </SelectMain.Root>
    </S.Container>
  );
}
