import { createTheme } from "@mui/material";
import { blue, green } from "@mui/material/colors";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main:
        process.env.NEXT_PUBLIC_BANK_CODE === "001" ? blue[500] : green[500],
      light:
        process.env.NEXT_PUBLIC_BANK_CODE === "001" ? blue[300] : green[300],
      dark:
        process.env.NEXT_PUBLIC_BANK_CODE === "001" ? blue[700] : green[700],
      contrastText: "#fff",
    },
    text: {
      primary: "#707070",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          backgroundColor: "#f5f5f5",
          background: 'url("/img/back.png") repeat right top',
          WebkitBackgroundSize: "cover",
          MozBackgroundSize: "cover",
          OBackgroundSize: "cover",
          backgroundSize: "cover",
        },
      }),
    },
    //@ts-expect-error - MuiDataGrid is not part of the types
    MuiDataGrid: {
      styleOverrides: {
        columnHeaderTitle: {
          fontWeight: "bold",
        },
      },
    },
  },
});

export default theme;
