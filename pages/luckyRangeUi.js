import { Box, Flex, Text, Button, Spinner, InputGroup, Input, useMediaQuery } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import CoinFlipPrediction from "../lib/abi.json";
import Mgtoken from "../lib/tokenContractAbi.json";
import Swal from "sweetalert2";


import Footer from "../components/Footer";
import Lucky from "../components/LuckyRange/Lucky/Lucky";
import LuckyHistory from "../components/LuckyRange/LuckyHistory";
import LuckyHowItWorks from "../components/LuckyRange/LuckyHowItWorks";
import LuckyNavbar from "../components/LuckyRange/luckyNavbar";
import LuckyMobile from "../components/LuckyRange/Lucky/LuckyMobile";

export default function luckyRangeUi({ COINFLIP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, NETWORK_ID }) {
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
    setBetAmount(e.target.value);
  }

 
  return (
    <>
    <Box background="rgba(0, 0, 0, 0.2)">
    <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} backgroundImage={'url("/luckyhero.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"} position={"relative"} mixBlendMode="darken">
    <Box width={"100vw"} h={["120rem", "105rem", "99rem", "50rem", "50rem"]} className="luckylight" position={"absolute"}></Box>
    <Flex width={"100%"}  alignItems={"center"}  justifyContent="center" direction={"column"} >
    <LuckyNavbar/>
  

   
      <Lucky/> 
   
 
 {/*    <LuckyMobile/>   */}
    <Box  w="100vw" backgroundImage={'url("/lower-bg.jpg")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}> 
    <LuckyHistory allRounds={allRounds} />
    <LuckyHowItWorks/>
  
    <Footer/>
     </Box>

    </Flex>
    
    </Box>
    </Box>
    

  

 
    </>
  );
}
