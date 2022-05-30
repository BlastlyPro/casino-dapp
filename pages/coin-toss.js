import { Box, Flex, Text, Button, Spinner, InputGroup, Input, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoinTossMain from "../components/CoinToss/CoinTossMain";
import HowItWorks from "../components/HowItWorks";
import History from "../components/History";
import CoinTossMobile from "../components/CoinToss/CoinTossMobile";
import { MainContext } from "../components/providers/MainProvider";
import { TOKEN_CONTRACT_ADDRESS } from "../env";
import Image from "next/image";

export default function CoinToss() {
  const { stateData, web3Data, getContractsData } = useContext(MainContext);
  const [state] = stateData;
  const [web3] = web3Data;
  const [isLoading, setIsLoading] = useState(false);
  const [coinTossState, setCoinTossState] = useState(null);
  const [allRounds, setAllRounds] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // chakra-ui
  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)");

  useEffect(() => {
    const initCoinFlip = async () => {
      setIsLoading(true);
      const { blastlyContract, tokenContract } = getContractsData();
      let allRoundsCount = await blastlyContract.methods.totalRound().call();
      let _allRounds = [];

      for (var i = 1; i <= allRoundsCount; i++) {
        var roundObj = await blastlyContract.methods.allRounds(i).call();
        roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount, "ether");
        roundObj.player2BetChoice = roundObj.player2BetChoice == true ? "Heads" : "Tails";
        roundObj.winningPosition = roundObj.winningPosition == true ? "Heads" : "Tails";
        _allRounds.push(roundObj);
      }
      setAllRounds(_allRounds);

      let contractBalance = await blastlyContract.methods.getBalance(TOKEN_CONTRACT_ADDRESS).call();
      contractBalance = web3.utils.fromWei(contractBalance, "ether");
      let PROJECT_FEE = await blastlyContract.methods.PROJECT_FEE().call();
      PROJECT_FEE = (PROJECT_FEE / 1000) * 100;
      let houseTotalFee = await blastlyContract.methods.houseTotalFee().call();
      houseTotalFee = web3.utils.fromWei(houseTotalFee, "ether");

      // if connected with an account
      if (state.account) {
        let walletBalance = await tokenContract.methods.balanceOf(state.account).call();
        walletBalance = web3.utils.fromWei(walletBalance, "ether");
        let balanceInsideContract = await blastlyContract.methods.allUsers(state.account).call();
        balanceInsideContract = web3.utils.fromWei(balanceInsideContract, "ether");
        setCoinTossState({
          blastlyContractData: blastlyContract,
          tokenContractData: tokenContract,
          coinFlip: {
            allRoundsCount: allRoundsCount,
            contractBalance: contractBalance,
            walletBalance: walletBalance,
            balanceInsideContract: balanceInsideContract,
            PROJECT_FEE: PROJECT_FEE,
            houseTotalFee: houseTotalFee,
          },
        });
      }

      // if not connected with an account
      setCoinTossState({
        blastlyContractData: blastlyContract,
        tokenContractData: tokenContract,
        coinFlip: {
          allRoundsCount: allRoundsCount,
          contractBalance: contractBalance,
          PROJECT_FEE: PROJECT_FEE,
          houseTotalFee: houseTotalFee,
        },
      });

      setIsLoading(false);
    };
    if (web3 && web3.eth) {
      console.log(web3);
      initCoinFlip();
    }
  }, [web3, state.account, getContractsData]);

  async function executeCoinFlip(betChoice, betAmount) {
    setIsLoading(true);
    var bta = web3.utils.toWei(String(betAmount), "ether");
    var secretKeyGen;
    let allowance = await coinTossState.tokenContractData.methods.allowance(state.account, coinTossState.blastlyContractData._address).call();
    console.log(allowance);
    axios.post("/api/secretKeyGenerate", { player2Address: state.account }).then((response) => {
      secretKeyGen = response.data;
      axios.post("/api/coinflip", { betChoice: betChoice, betAmount: bta, normalBetAmount: betAmount, player2Address: state.account, txnHash: "0xxxxxx" }).then((response) => {
        console.log(response);
        console.log("=------------- allowance -----------------");

        if (allowance < bta) {
          coinTossState.tokenContractData.methods
            .approve(coinTossState.blastlyContractData._address, web3.utils.toWei(String(9 * 1e18), "ether"))
            .send({ from: state.account })
            .then((res) => {
               _callCoinFlip(betChoice, bta, response, secretKeyGen, betAmount)
              // coinTossState.blastlyContractData.methods
              //   .takeBet(state.account, betChoice, bta, response.data.secretChoice, " ", secretKeyGen)
              //   .send({ from: state.account })
              //   .then((reponse007) => {
              //     Swal.fire({
              //       title: "Result",
              //       text: reponse007.events.GameMessage.returnValues.mesg,
              //       icon: "success",
              //     });
              //     setIsLoading(false);
              //     setShowResult(true);
              //   })
              //   .catch((err) => {
              //     console.log(err.message);
              //     setIsLoading(false);
              //   });
            });
        } else {
          console.log("Direct calling Coinflip sol");
           _callCoinFlip(betChoice, bta, response, secretKeyGen, betAmount)
          // coinTossState.blastlyContractData.methods
          //   .takeBet(state.account, betChoice, bta, response.data.secretChoice, " ", secretKeyGen)
          //   .send({ from: state.account })
          //   .then((reponse007) => {
          //     setShowResult(true);
          //     setIsLoading(false);
          //   })
          //   .catch((err) => {
          //     console.log(err.message);
          //     setIsLoading(false);
          //   });
        }
      });
    });
  }

  async function _callCoinFlip(betChoice, bta, response, secretKeyGen, normalBetAmount) {

    const { blastlyContract } = getContractsData();
    var _txnHash;
    await blastlyContract.methods
    .takeBet(state.account, betChoice, bta, response.data.secretChoice, " ", secretKeyGen)
    .send({ from: state.account })
    .then((reponse007) => {
      _txnHash= reponse007.transactionHash;
      setShowResult(true);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err.message);
      setIsLoading(false);
    });
      const { supabase } = getContractsData();     
      let {data, err, stat}=await supabase.from('coinFlip').insert([
        { player2Address: state.account, player2BetAmount:normalBetAmount, player2BetChoice:betChoice , winningPosition:response.data.secretChoice, txn:_txnHash}
      ]);
      console.log(data);
  }

  async function claimBonus() {
    setShowResult(false);
    setIsLoading(true);
    coinTossState.blastlyContractData.methods
      .claim()
      .send({ from: state.account })
      .then((response) => {
        setShowResult(false)
        setIsLoading(false);
        Swal.fire({
          title: "Success!",
          text: "Please Check your Wallet",
          icon: "success",
        });
      });
  }

  return (
    <>
      {/* for desktop------------------------- */}
      {isLargerThan993 ? (
        <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/images/main-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"}>
          <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="lightning" position={"absolute"}></Box>
          <Flex width={"100%"} alignItems={"center"} gap={"5"} direction={"column"} color={"white"}>
            <Navbar />

            {isLoading && (
              <Flex w={["100%", "100%", "100%", "50%", "50%"]} height={"100vh"} alignItems="center" justifyContent="center" direction="column">
                <Flex
                  background="rgba(255, 255, 255, 0.6)"
                  w={["100%", "100%", "100%", "94%", "94%"]}
                  h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]}
                  opacity={".9"}
                  backdrop-filter="blur(20px)"
                  borderRadius="1rem"
                  direction={"Column"}
                  gap="2rem"
                  justifyContent={"center"}
                  alignItems="center"
                >
                  <Flex justifyContent={"center"}>
                    <Image width="163.33px" height="163.33px" src={"/load.gif"} alt="right" />
                  </Flex>

                  <Flex justifyContent={"center"}>
                    <Image width="100px" height="30pxpx" src={"/loadn.gif"} alt="right" />
                  </Flex>
                </Flex>
              </Flex>
            )}

            {!isLoading && coinTossState ? (
              <>
                <CoinTossMain
                  blastlyContractData={coinTossState.blastlyContractData}
                  coinFlip={executeCoinFlip}
                  allRounds={allRounds}
                  allRoundsCount={coinTossState.allRoundsCount}
                  contractBalance={coinTossState.contractBalance}
                  PROJECT_FEE={coinTossState.PROJECT_FEE}
                  _coinFlip={coinTossState}
                />
              </>
            ) : (
              "No Balance"
            )}

            {showResult && (
              <Flex bgColor={"rgba(0, 0, 0, 0.9)"} position={"absolute"} w={"100%"} height="100vh" alignItems="center" justifyContent="center" direction="column">
                <Flex
                  bgColor={"rgba(86, 146, 250, 0.6)"}
                  w={["100%", "100%", "100%", "50%", "50%"]}
                  h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]}
                  opacity={".9"}
                  backdrop-filter="blur(20px)"
                  borderRadius="1rem"
                  direction={"Column"}
                  gap="1.5rem"
                >
                  <Flex direction={"Column"} pt="1.5rem">
                    <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
                      You Win!
                    </Text>
                    <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
                      Tails brings you a victory. Good job!
                    </Text>
                  </Flex>

                  <Flex alignItems={"center"} justifyContent="center" gap="1rem">
                    <Flex direction="column">
                      <Text textAlign="end" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                        Bet:
                      </Text>
                      <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                        1000 BNB
                      </Text>
                    </Flex>

                    <Flex>
                      <Image width="160px" height="160px" src="/Tails.png" alt="Tails" />
                    </Flex>
                    <Flex direction="column">
                      <Text textAlign="start" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                        Payout:
                      </Text>
                      <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                        1980 BNB
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex justifyContent={"center"} gap="1rem">
                    <Button onClick={() => claimBonus()} background="#102542" w="10.125rem" h="3rem" color="white" borderRadius="30px">
                      Claim your win!
                    </Button>

                    <Button background="rgba(187, 211, 253, 0.2)" w="8.1875rem" h="3rem" color="white" borderRadius="30px" onClick={() => window.location.reload()}>
                      Play agin!
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
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

            {coinTossState ? (
              <CoinTossMobile
                blastlyContractData={coinTossState.blastlyContractData}
                coinFlip={executeCoinFlip}
                allRounds={allRounds}
                allRoundsCount={coinTossState.allRoundsCount}
                contractBalance={coinTossState.contractBalance}
                PROJECT_FEE={coinTossState.PROJECT_FEE}
                _coinFlip={coinTossState}
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
