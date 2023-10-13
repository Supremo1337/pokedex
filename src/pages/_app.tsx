import { Globaltyles } from "@/styles/globalStyles";
import type { AppProps } from "next/app";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import { dark } from "@/styles/themeType";
import { ThemeProvider } from "styled-components";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={dark}>
      <Component {...pageProps} />
      <Globaltyles />
    </ThemeProvider>
  );
}
