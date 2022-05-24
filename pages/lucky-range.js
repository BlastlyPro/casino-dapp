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
      const { blastlyContract } = getContractsData();
      let allRoundsCount = await blastlyContract.methods.totalLuckyRangeRound().call();
      setAllRoundsCount(allRoundsCount);
      let _allRounds = [];

      for (var i = 1; i <= allRoundsCount; i++) {
        var roundObj = await blastlyContract.methods.luckyRangeRounds(i).call();
        roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount, "ether");
        _allRounds.push(roundObj);
      }
      setAllRounds(_allRounds);
    };
    if (web3 && web3.utils) {
      init();
    }
  }, [web3, state.account, getContractsData]);

  async function executeLuckyRange(minRange, maxRange, betAmount) {
    const { blastlyContract, tokenContract } = getContractsData();
    var range = { minRange: minRange, maxRange: maxRange };
    var bta = web3.utils.toWei(String(betAmount), "ether");
    var secretKeyGen;
    ////////////////////////////////////////
    let allowance = await tokenContract.methods.allowance(state.account, blastlyContract._address).call();
    console.log(allowance);
    axios.post("/api/secretKeyGenerate", { player2Address: state.account }).then((response) => {
      // console.log("------------Secret Key ------------");
      //   console.log(response.data);
      secretKeyGen = response.data;
      axios.post("/api/luckyRange", { betRange: range, betAmount: bta, normalBetAmount: betAmount, player2Address: state.account, txnHash: "0xxxxxx" }).then(async (response) => {
        console.log(response);
        console.log("=------------- allowance -----------------");
        if (allowance < bta) {
          await tokenContract.methods
            .approve(blastlyContract._address, web3.utils.toWei(String(9 * 1e18), "ether"))
            .send({ from: state.account })
            .then(async (res) => {
              await callLuckyRange(bta, response, secretKeyGen, maxRange);
            });
        } else {
          console.log("Direct calling lucky range sol");
          callLuckyRange(bta, response, secretKeyGen);
        }
      });
    });
  }

  async function callLuckyRange(bta, response, secretKeyGen, maxRange) {
    const { blastlyContract } = getContractsData();
    await blastlyContract.methods
      .luckyRange(state.account, bta, maxRange, response.data.luckyNumber, "0x", response.data.playerPayout, response.data.playerFlag, response.data.payoutDivider, secretKeyGen)
      .send({ from: state.account })
      .then((reponse007) => {
        //console.log(reponse007.transactionHash)
        Swal.fire({
          title: "Result",
          text: reponse007.events.GameMessage.returnValues.mesg,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <>
      {/* for desktop------------------------- */}
      {isLargerThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/luckyhero.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"} mixBlendMode="darken">
          <Box background="rgba(0, 0, 0, 0.5)">
            <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="luckylight" position={"absolute"}></Box>

            <Flex width={"100%"} alignItems={"center"} justifyContent="center" direction={"column"}>
              <Navbar />
              <LuckyMain allRounds={allRounds} allRoundsCount={allRoundsCount} executeLuckyRange={executeLuckyRange} />
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
