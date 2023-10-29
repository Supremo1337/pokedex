type ColorTheme = {
  black: {
    black_900: string;
    black_700: string;
  };
  gray: {
    gray_900: string;
    gray_800: string;
    gray_600: string;
    gray_700: string;
  };
  white: {
    white_900: string;
    white_700: string;
  };
};

type FontTheme = {
  poppins: Record<string, string>; // Usando Record<string, string> para permitir índices de strings
  dmSans: Record<string, string>; // Usando Record<string, string> para permitir índices de strings
};

type Theme = {
  colors: ColorTheme;
  fonts: FontTheme;
};

export const theme: Theme = {
  colors: {
    black: {
      black_900: "#212225",
      black_700: "#0A1B31",
    },
    gray: {
      gray_900: "#7C7C8A",
      gray_800: "#87898D",
      gray_600: "#828282",
      gray_700: "#363743",
    },
    white: {
      white_900: "#F6F8FC",
      white_700: "#FFFFFF",
    },
  },
  fonts: {
    poppins: {
      title_1: "700 16px 'Poppins'",
      title_2: "600 20px 'Poppins'",
      title_3: "600 16px 'Poppins'",
      title_4: "500 16px 'Poppins'",
      title_5: "500 12px 'Poppins'",
    },
    dmSans: {
      // paragraph_e1: "700 16px 'DM Sans', sans-serif;",
      // paragraph_e2: "500 12px 'DM Sans', sans-serif;",
      // paragraph_e3: "500 14px 'DM Sans', sans-serif;",
      // paragraph_e4: "500 16px 'DM Sans', sans-serif;",
      // paragraph_e5: "500 10px 'DM Sans', sans-serif;",
      paragraph_1: "700 16px 'DM Sans', sans-serif;",
      paragraph_2: "500 16px 'DM Sans', sans-serif;",
      paragraph_3: "500 14px 'DM Sans', sans-serif;",
      paragraph_4: "500 12px 'DM Sans', sans-serif;",
      paragraph_5: "500 10px 'DM Sans', sans-serif;",
      // paragraph_o1: "700 16px 'DM Sans', sans-serif;",
      // paragraph_o4: "500 16px 'DM Sans', sans-serif;",
      // paragraph_o3: "500 14px 'DM Sans', sans-serif;",
      // paragraph_o2: "500 12px 'DM Sans', sans-serif;",
      // paragraph_o5: "500 10px 'DM Sans', sans-serif;",
    },
  },
};
