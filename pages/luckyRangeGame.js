import { Box, Flex, Text, Button, Spinner, InputGroup, Input, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import CoinFlipPrediction from "../lib/abi.json";
import Mgtoken from "../lib/tokenContractAbi.json";
import Swal from "sweetalert2";

import Footer from "../components/Footer";
import Lucky from "../components/LuckyRange/MainLucky";
import LuckyHistory from "../components/LuckyRange/LuckyHistory";
import LuckyHowItWorks from "../components/LuckyRange/LuckyHowItWorks";
import Navbar from "../components/Navbar";
import LuckyMobile from "../components/LuckyRange/LuckyMobile";

export default function LuckyRangeGame({ COINFLIP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, NETWORK_ID }) {
  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)");

  return (
    <>
      {/* for desktop------------------------- */}
      {isLargerThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/luckyhero.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"} mixBlendMode="darken">
          <Box background="rgba(0, 0, 0, 0.5)">
            <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="luckylight" position={"absolute"}></Box>

            <Flex width={"100%"} alignItems={"center"} justifyContent="center" direction={"column"}>
              <Navbar />
              <Lucky />
              <Box w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
                <LuckyHistory />
                <LuckyHowItWorks />

                <Footer />
              </Box>
            </Flex>
          </Box>
        </Box>
      ) : null}

      {/* for mobile------------------------- */}
      {isLessThan993 ? (
        <Box background="rgba(0, 0, 0, 0.2)">
          <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/luckyhero.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"} mixBlendMode="darken">
            <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="luckylight" position={"absolute"}></Box>

            <Flex width={"100%"} alignItems={"center"} justifyContent="center" direction={"column"}>
              <Navbar />
              <LuckyMobile />
              <Box w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
                <LuckyHistory />
                <LuckyHowItWorks />

                <Footer />
              </Box>
            </Flex>
          </Box>
        </Box>
      ) : null}
    </>
  );
}
