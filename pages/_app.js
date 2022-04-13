import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";

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
    <MoralisProvider serverUrl="https://hhxc96acrrh0.usemoralis.com:2053/server" appId="CxJg1cSlT7EFzXHRQgV6aHBNNrifmNg99dyCup4z">
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </MoralisProvider>
  );
}

export default MyApp;
