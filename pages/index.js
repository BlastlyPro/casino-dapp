import { Box, Flex, Text, Button, Spinner, InputGroup, Input, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoinToss from "../components/CoinToss/CoinToss";
import HowItWorks from "../components/HowItWorks";
import History from "../components/History";
import CoinTossMobile from "../components/CoinToss/CoinTossMobile";
import { MainContext } from "../components/providers/MainProvider";

export default function Home() {
  const { stateData, betAmountData, allRoundsData, handleChange } = useContext(MainContext);
  const [state, setState] = stateData;
  const [betAmount] = betAmountData;
  const [allRounds] = allRoundsData;
  const [isLoading, setIsLoading] = useState(false);

  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)");

  async function coinFlip(betChoice) {
    var bta = state.web3.utils.toWei(String(betAmount), "ether");
    //setIsLoading(true);
    var secretKeyGen;
    ////////////////////////////////////////
    let allowance = await state.tokenContractData.methods.allowance(state.account, state.coinFlipContractData._address).call();
    console.log(allowance);
    axios.post("/api/secretKeyGenerate", { player2Address: state.account }).then((response) => {
      secretKeyGen = response.data;
      axios.post("/api/coinflip", { betChoice: betChoice, betAmount: bta, normalBetAmount: betAmount, player2Address: state.account, txnHash: "0xxxxxx" }).then((response) => {
        console.log(response);
        console.log("=------------- allowance -----------------");

        if (allowance < bta) {
          state.tokenContractData.methods
            .approve(state.coinFlipContractData._address, state.web3.utils.toWei(String(9 * 1e18), "ether"))
            .send({ from: state.account })
            .then((res) => {
              state.coinFlipContractData.methods
                .takeBet(state.account, betChoice, bta, response.data.secretChoice, " ", secretKeyGen)
                .send({ from: state.account })
                .then((reponse007) => {
                  Swal.fire({
                    title: "Result",
                    text: reponse007.events.GameMessage.returnValues.mesg,
                    icon: "success",
                  });
                })
                .catch((err) => {
                  console.log(err.message);
                });
            });
        } else {
          console.log("Direct calling Coinflip sol");
          state.coinFlipContractData.methods
            .takeBet(state.account, betChoice, bta, response.data.secretChoice, " ", secretKeyGen)
            .send({ from: state.account })
            .then((reponse007) => {
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
      });
    });
  }

  async function claimBonus() {
    setIsLoading(true);
    state.coinFlipContractData.methods
      .claim()
      .send({ from: state.account })
      .then((response) => {
        setIsLoading(false);
        Swal.fire({
          title: "Result",
          text: "Please Check your Wallet",
          icon: "success",
        });
      });
  }



  // if (isLoading) {
  //   return (
  //     <Flex
  //       width="100vw"
  //       height="100vh"
  //       alignItems="center"
  //       justifyContent="center"
  //       direction={"column"}
  //     >
  //       <Spinner color="red.500" size="xl" />
  //       <Text textAlign={"center"} fontSize={"1xl"}>
  //         Please Wait! Do not refresh or close the browser.
  //       </Text>
  //     </Flex>
  //   );
  // }

  return (
    <>
      {/* for desktop------------------------- */}
      {isLargerThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/images/main-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"}>
          <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="lightning" position={"absolute"}></Box>
          <Flex width={"100%"} alignItems={"center"} gap={"5"} direction={"column"} color={"white"}>
            <Navbar />

            {isLoading && <Spinner color="red.500" size="xl" />}

            {state.coinFlip ? (
              <>
                <CoinToss
                  coinFlipContractData={state.coinFlipContractData}
                  handleChange={handleChange}
                  coinFlip={coinFlip}
                  allRounds={allRounds}
                  totalRound={state.coinFlip.totalRound}
                  contractBalance={state.coinFlip.contractBalance}
                  PROJECT_FEE={state.coinFlip.PROJECT_FEE}
                  _coinFlip={state.coinFlip}
                />
              </>
            ) : (
              "No Balance"
            )}

            <Box w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
              <History allRounds={allRounds} />
              <HowItWorks />
              <Footer />
            </Box>
          </Flex>
        </Box>
      ) : null}

      {/* for mobile------------------------- */}
      {isLessThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/images/main-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"}>
          <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="lightning" position={"absolute"}></Box>
          <Flex width={"100%"} alignItems={"center"} gap={"5"} direction={"column"} color={"white"}>
            <Navbar />

            {isLoading && <Spinner color="red.500" size="xl" />}

            {state.coinFlip ? (
              <CoinTossMobile
                coinFlipContractData={state.coinFlipContractData}
                handleChange={handleChange}
                coinFlip={coinFlip}
                allRounds={allRounds}
                totalRound={state.coinFlip.totalRound}
                contractBalance={state.coinFlip.contractBalance}
                PROJECT_FEE={state.coinFlip.PROJECT_FEE}
                _coinFlip={state.coinFlip}
              />
            ) : (
              "No Balance"
            )}

            <Box w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
              <History allRounds={allRounds} />
              <HowItWorks />
              <Footer />
            </Box>
          </Flex>
        </Box>
      ) : null}
    </>
  );
}
