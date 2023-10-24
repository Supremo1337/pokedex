import {
  PokeApiRequestContext,
  PokeApiRequestProvider,
} from "@/components/contexts/pokeApiRequestContext";
import { Globaltyles } from "@/styles/globalStyles";
import type { AppProps } from "next/app";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import { dark } from "@/styles/themeType";
import { ThemeProvider } from "styled-components";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useContext } from "react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PokeApiRequestProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={dark}>
          <Component {...pageProps} />
          <Globaltyles />
        </ThemeProvider>
      </QueryClientProvider>
    </PokeApiRequestProvider>
  );
}
