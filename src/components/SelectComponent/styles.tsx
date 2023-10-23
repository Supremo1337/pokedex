import { theme } from "@/styles/themes";
import styled from "styled-components";

interface SelectIconProps {
  icon?: string;
}

export const Container = styled.div`
  flex: 0 0 162px;
  height: 46px;

  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0px 12px;

  border-radius: 4px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const SelectOption = styled.option`
  font: ${theme.fonts.dmSans.paragraph_1};
  color: ${theme.colors.gray.gray_600};
  border: 1px solid #fff;
  outline: 1px solid #fff;
  text-transform: capitalize;
`;

export const SelectIcon = styled.div<SelectIconProps>`
  width: 28px;
  height: 28px;
  background-image: ${(props) => `url("/icon/${props.icon}.svg")`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const SelectStyle = styled.select`
  flex-grow: 1;
  height: 46px;

  display: flex;
  align-items: center;

  border: 1px solid #fff;
  outline: none;
  background: #fff;
  font: ${theme.fonts.dmSans.paragraph_1};
  color: ${theme.colors.gray.gray_600};
  text-transform: capitalize;
`;
