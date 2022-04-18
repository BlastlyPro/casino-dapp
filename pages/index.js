import { Box, Flex, Text, Button, Spinner, InputGroup, Input,useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import CoinFlipPrediction from "../lib/abi.json";
import Mgtoken from "../lib/tokenContractAbi.json";
import Swal from "sweetalert2";
import TransactionTable from "../components/TransactionTable";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CoinToss from "../components/CoinToss/CoinToss";
import HowItWorks from "../components/HowItWorks";
import History from "../components/History";
import CoinTossMobile from "../components/mobile/CoinTossMobile/CoinTossMobile";
import HistoryMobile from "../components/mobile/HistoryMobile";

export default function Home({ COINFLIP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, NETWORK_ID }) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    account: {},
    metaData: [],
    coinFlipContractData: {},
    coinFlip: {
      totalRound: 0,
    },
  });
  const [allRounds, setAllRounds] = useState(null);
  const [_betAmount, setBetAmount] = useState(null);

  // useEffect(() => {
  //   const checkConnection = async () => {
  //     // Check if browser is running Metamask
  //     let web3;
  //     if (window.ethereum) {
  //       web3 = new Web3(window.ethereum);
  //       // Check if User is already connected by retrieving the accounts
  //       web3.eth.getAccounts().then(async (addr) => {
  //         if (addr.length !== 0) {
  //           await loadWeb3Data();
  //           await loadBlockchainData();
  //         } else {
  //           console.log("no account connected");
  //         }
  //       });
  //     } else if (window.web3) {
  //       web3 = new Web3(window.web3.currentProvider);
  //       // Check if User is already connected by retrieving the accounts
  //       web3.eth.getAccounts().then(async (addr) => {
  //         if (addr.length !== 0) {
  //           await loadWeb3Data();
  //           await loadBlockchainData();
  //         } else {
  //           console.log("no account connected");
  //         }
  //       });
  //     } else {
  //       alert(
  //         "Non-Ethereum browser detected. You should consider trying MetaMask!"
  //       );
  //     }
  //   };
  //   checkConnection();
  // }, []);

  useEffect(() => {
    const init = async () => {
      await loadWeb3Data();
      await loadBlockchainData();
    };
    init();
  }, []);

  const loadWeb3Data = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setIsLoading(false);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const coinFlipaddress = COINFLIP_CONTRACT_ADDRESS;
    const tokenContractAddres = TOKEN_CONTRACT_ADDRESS;
    const abi = CoinFlipPrediction.abi;
    const tokenContractAbi = Mgtoken.abi;
    const accounts = await web3.eth.getAccounts();
    const coinFlipContract = new web3.eth.Contract(abi, coinFlipaddress);
    const tokenContract = new web3.eth.Contract(tokenContractAbi, tokenContractAddres);
    let totalRound = await coinFlipContract.methods.totalRound().call();
    let _allRounds = [];

    for (var i = 1; i <= totalRound; i++) {
      var roundObj = await coinFlipContract.methods.allRounds(i).call();
      roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount, "ether");
      roundObj.player2BetChoice = roundObj.player2BetChoice == true ? "Heads" : "Tails";
      roundObj.winningPosition = roundObj.winningPosition == true ? "Heads" : "Tails";
      _allRounds.push(roundObj);
    }
    setAllRounds(_allRounds);
    console.log(coinFlipContract);
    console.log(tokenContract);
    console.log(accounts[0]);

    let contractBalance = await coinFlipContract.methods.getBalance(TOKEN_CONTRACT_ADDRESS).call();
    let walletBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
    let balanceInsideContract = await coinFlipContract.methods.allUsers(accounts[0]).call();
    let PROJECT_FEE = await coinFlipContract.methods.PROJECT_FEE().call();
    PROJECT_FEE = (PROJECT_FEE / 1000) * 100;
    let houseTotalFee = await coinFlipContract.methods.houseTotalFee().call();
    houseTotalFee = web3.utils.fromWei(houseTotalFee, "ether");
    walletBalance = web3.utils.fromWei(walletBalance, "ether");
    contractBalance = web3.utils.fromWei(contractBalance, "ether");
    balanceInsideContract = web3.utils.fromWei(balanceInsideContract, "ether");
    setState({
      account: {
        accounts: accounts,
      },
      web3: web3,
      coinFlipContractData: coinFlipContract,
      tokenContractData: tokenContract,
      coinFlip: {
        totalRound: totalRound,
        contractBalance: contractBalance,
        walletBalance: walletBalance,
        balanceInsideContract: balanceInsideContract,
        PROJECT_FEE: PROJECT_FEE,
        houseTotalFee: houseTotalFee,
      },
    });

    setIsLoading(false);
  };

  async function coinFlip(betChoice) {
    var bta = state.web3.utils.toWei(String(_betAmount), "ether");
    setIsLoading(true);
    await state.tokenContractData.methods
      .transfer(state.coinFlipContractData._address, bta)
      .send({ from: state.account.accounts[0] })
      .then((reponse) => {
        console.log(reponse.transactionHash);
        ////////////////////////////////////////////
        axios
          .post("/api/coinflip", {
            betChoice: betChoice,
            _betAmount: bta,
            normalBetAmount: _betAmount,
            player2Address: state.account.accounts[0],
            txnHash: reponse.transactionHash,
          })
          .then((response) => {
            setIsLoading(false);
            Swal.fire({
              title: "Result",
              text: response.data.events.GameMessage.returnValues.mesg,
              icon: "success",
            });
            //   state.coinFlipContractData.methods.takeBet(state.tokenContractData._address,betChoice,bta,commitment.data.secretChoice)
            //     .send({ from: state.account.accounts[0] }).then((reponse) => {
            //       console.log(reponse);
            //       console.log(reponse.transactionHash);
            //       reveal(commitment.data, reponse.transactionHash);
            //     })
            //     .catch((err) => {
            //       setIsLoading(false);
            //       console.log(err.message);
            //     });
            // })
            // .catch((err) => {
            //   setIsLoading(false);
            //   console.log(err.message);
          });
        //////////////////////////////////////////
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  async function claimBonus() {
    setIsLoading(true);
    state.coinFlipContractData.methods
      .claim()
      .send({ from: state.account.accounts[0] })
      .then((response) => {
        setIsLoading(false);
        Swal.fire({
          title: "Result",
          text: "Please Check your Wallet",
          icon: "success",
        });
      });
  }

  function handleChange(e) {
    console.log(e.target.value);
    setBetAmount(e.target.value);
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

  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)");


  return (

    <>
     {/* for desktop------------------------- */}
     {isLargerThan993 ? (
      <Box width={"100vw"}  h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/images/main-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"}>
      <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="lightning" position={"absolute"}></Box>
      <Flex width={"100%"}     alignItems={"center"} gap={"5"} direction={"column"} color={"white"}>
        <Navbar />

        {isLoading && <Spinner color="red.500" size="xl" />}

        {state.coinFlip ? (
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
        ) : (
          "No Balance"
        )}

        <Box  w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}> 
        <History allRounds={allRounds} />
          <HowItWorks />
          <Footer />
        </Box>

        {/* <Flex minWidth={"1416px"}  width={ "100%"} mt={ "5rem"}>
          <Flex width={ "50%"} direction={ "column"} justifyContent="center" alignItems={ "center"} gap={ "5"}>
            <Text> Connected Account: {state.account.accounts && String(state.account.accounts).substring(0, 5) + " ... " + String(state.account.accounts).slice(-4)} </Text> {state.coinFlip ? (
            <>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Total Contract Balance: {Number(state.coinFlip.contractBalance).toFixed(5)} </Text>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Wallet Balance: {Number(state.coinFlip.walletBalance).toFixed(5)} </Text>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Balance Inside Contract: {Number(state.coinFlip.balanceInsideContract).toFixed(2)}
                <Button bgColor={ "yellow.400"} onClick={()=> claimBonus()}> Claim Bonus </Button>
              </Text>
              <Text>Total Round: {state.coinFlip.totalRound}</Text>
              </> ) : (
              <Text>No Contract Balance</Text> )} 
          </Flex>
          <Flex width={ "50%"} direction={ "column"} justifyContent="center" alignItems={ "center"} gap={ "5"}></Flex>
        </Flex> */}
        {/* <Flex direction={ "column"} mt={ "3rem"}>
          <Text fontSize={ "2xl"}>Transaction History</Text> {state.coinFlip ?
          <TransactionTable allRounds={allRounds} /> : null}
        </Flex> */}
      </Flex>
    </Box>
    ) : null}



     {/* for mobile------------------------- */}
     {isLessThan993 ? (
        <Box  width={"100vw"}  h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/images/main-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"}>
      <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="lightning" position={"absolute"}></Box>
      <Flex width={"100%"}     alignItems={"center"} gap={"5"} direction={"column"} color={"white"}>
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

        <Box w="100vw"  backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}> 
      <HistoryMobile  allRounds={allRounds}/>
        <HowItWorks/>
        <Footer />
        </Box>

        {/* <Flex width={ "100%"} mt={ "5rem"}>
          <Flex width={ "50%"} direction={ "column"} justifyContent="center" alignItems={ "center"} gap={ "5"}>
            <Text> Connected Account: {state.account.accounts && String(state.account.accounts).substring(0, 5) + " ... " + String(state.account.accounts).slice(-4)} </Text> {state.coinFlip ? (
            <>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Total Contract Balance: {Number(state.coinFlip.contractBalance).toFixed(5)} </Text>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Wallet Balance: {Number(state.coinFlip.walletBalance).toFixed(5)} </Text>
              <Text fontWeight={ "bold"} color="blackAlpha.400"> Balance Inside Contract: {Number(state.coinFlip.balanceInsideContract).toFixed(2)}
                <Button bgColor={ "yellow.400"} onClick={()=> claimBonus()}> Claim Bonus </Button>
              </Text>
              <Text>Total Round: {state.coinFlip.totalRound}</Text>
              </> ) : (
              <Text>No Contract Balance</Text> )} 
          </Flex>
          <Flex width={ "50%"} direction={ "column"} justifyContent="center" alignItems={ "center"} gap={ "5"}></Flex>
        </Flex> */}
        {/* <Flex direction={ "column"} mt={ "3rem"}>
          <Text fontSize={ "2xl"}>Transaction History</Text> {state.coinFlip ?
          <TransactionTable allRounds={allRounds} /> : null}
        </Flex> */}
      </Flex>
    </Box>
    ) : null}
    

    </>
  );
}

export const getServerSideProps = async () => {
  const COINFLIP_CONTRACT_ADDRESS = process.env.COINFLIP_CONTRACT_ADDRESS || null;
  const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS || null;
  const NODE_PRODIVER_URL = process.env.NODE_PRODIVER_URL || null;
  const SITENAME = process.env.SITENAME || null;
  const NETWORK_ID = process.env.NETWORK_ID || null;

  return {
    props: {
      COINFLIP_CONTRACT_ADDRESS,
      TOKEN_CONTRACT_ADDRESS,
      NODE_PRODIVER_URL,
      SITENAME: SITENAME,
      NETWORK_ID,
    },
  };
};
