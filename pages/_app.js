import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { MainProvider } from "../components/providers/MainProvider";
import NextNprogress from "nextjs-progressbar";

const theme = extendTheme({
  colors: {
    brand: {
      900: "#FED700",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
  fonts: {
    heading: '"Roboto", sans-serif',
    body: '"Roboto", sans-serif',
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <NextNprogress color="#1e76db" startPosition={0.1} stopDelayMs={200} height={3} showOnShallow={false} />
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </ChakraProvider>
  );
}

export default MyApp;
