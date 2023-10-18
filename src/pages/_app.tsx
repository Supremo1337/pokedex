import { Globaltyles } from "@/styles/globalStyles";
import type { AppProps } from "next/app";
import "@fontsource/poppins";
import "@fontsource/dm-sans";
import { dark } from "@/styles/themeType";
import { ThemeProvider } from "styled-components";
import { queryClient } from "@/services/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={dark}>
        <Component {...pageProps} />
        <Globaltyles />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
