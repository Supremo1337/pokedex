import { theme } from "@/styles/themes";
import styled from "styled-components";

export const Container = styled.div`
  width: 325px;
  height: 36px;
  border-radius: 4px;
  background: ${theme.colors.white.white_700};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 6px 12px;
  display: flex;
  gap: 0.6rem;
  align-items: center;
  ::placeholder {
    font: ${theme.fonts.dmSans.paragraph_2};
    color: ${theme.colors.gray.gray_900};
  }
`;

export const InputSearch = styled.input`
  flex-grow: 1;
  font-size: 1.2rem;
  border: none;
  outline: none;
  display: flex;
  ::placeholder {
    font: ${theme.fonts.dmSans.paragraph_2};
    color: red;
  }
  /* @media (min-width: 720px) {
    font-size: 1.4rem;
    ::placeholder {
      font-size: 1.4rem;
    }
  } */
`;

export const Icon = styled.div`
  width: 24px;
  height: 24px;
  background-image: url("/icon/iconsearchcerto.svg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  /* box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); */
`;
