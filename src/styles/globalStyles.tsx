import { createGlobalStyle } from "styled-components";
import { theme } from "./themes";

export const Globaltyles = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Poppins";
}

html{
  background: ${theme.colors.white.white_900};
}

html,
body {
  max-width: 100vw;
  overflow-x: hidden;
  padding: 24px 12px;
  font-size: 62.5%;

  @media (min-width: 1024px) {
    padding: 30px 80px;
  }
  @media (min-width: 1366px) {
    padding: 30px 128px;
  }
}

a {
  color: inherit;
  text-decoration: none;
}
`;
