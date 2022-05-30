import { Box, Flex, Text, Button, Spinner, InputGroup, Input, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Footer from "../components/Footer";
import LuckyMain from "../components/LuckyRange/LuckyMain";
import LuckyHistory from "../components/LuckyRange/LuckyHistory";
import LuckyHowItWorks from "../components/LuckyRange/LuckyHowItWorks";
import Navbar from "../components/Navbar";
import LuckyMobile from "../components/LuckyRange/LuckyMobile";
import { MainContext } from "../components/providers/MainProvider";

export default function LuckyRangeGame() {
  const { stateData, web3Data, getContractsData } = useContext(MainContext);
  const [state] = stateData;
  const [web3] = web3Data;
  const [allRounds, setAllRounds] = useState(null);
  const [allRoundsCount, setAllRoundsCount] = useState(null);
  // chakta-ui
  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)");
  useEffect(() => {
    const init = async () => {
      // const { blastlyContract } = getContractsData();
      // let allRoundsCount = await blastlyContract.methods.totalLuckyRangeRound().call();
      // setAllRoundsCount(allRoundsCount);
      let _allRounds = [];

      // for (var i = 1; i <= allRoundsCount; i++) {
      //   var roundObj = await blastlyContract.methods.luckyRangeRounds(i).call();
      //   roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount, "ether");
      //   _allRounds.push(roundObj);
      // }
      const {supabase}=getContractsData();
      let { data, error } = await supabase.from('luckyRange').select();
      setAllRounds(data);      
    };
    if (web3 && web3.utils) {
      init();
    }
  }, [web3, state.account, getContractsData]);



  return (
    <>
      {/* for desktop------------------------- */}
      {isLargerThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/luckyhero.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"} mixBlendMode="darken">
          <Box background="rgba(0, 0, 0, 0.5)">
            <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="luckylight" position={"absolute"}></Box>

            <Flex width={"100%"} alignItems={"center"} justifyContent="center" direction={"column"}>
              <Navbar />

              <LuckyMain allRounds={allRounds} allRoundsCount={allRoundsCount}/>
              <Box w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
                <LuckyHistory allRounds={allRounds} />
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
              <LuckyMobile allRounds={allRounds} allRoundsCount={allRoundsCount} executeLuckyRange={executeLuckyRange} />
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
