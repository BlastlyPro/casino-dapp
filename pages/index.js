import { Flex, STextacer, Text, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import CoinFlipPrediction from "../lib/abi.json";
import Mgtoken from "../lib/tokenContractAbi.json";
import Swal from "sweetalert2";

let _betAmount = 10;

export default function Home({
  COINFLIP_CONTRACT_ADDRESS,
  TOKEN_CONTRACT_ADDRESS,
  NODE_PRODIVER_URL,
  SITENAME,
  NETWORK_ID,
}) {
  console.log(SITENAME);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    account: {},
    metaData: [],
    coinFlipContractData: {},
    coinFlip: {
      totalRound: 0,
    },
  });

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

  useEffect(async () => {
    await loadWeb3Data();
    await loadBlockchainData();
  }, []);

  const loadWeb3Data = async () => {
    setIsLoading(true);
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      setIsLoading(false);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    setIsLoading(true);
    const web3 = window.web3;
    const coinFlipaddress = COINFLIP_CONTRACT_ADDRESS;
    const tokenContractAddres = TOKEN_CONTRACT_ADDRESS;
    const abi = CoinFlipPrediction.abi;
    const tokenContractAbi = Mgtoken.abi;
    const accounts = await web3.eth.getAccounts();
    const coinFlipContract = new web3.eth.Contract(abi, coinFlipaddress);
    const tokenContract = new web3.eth.Contract(
      tokenContractAbi,
      tokenContractAddres
    );
    const totalRounds = await coinFlipContract.methods.totalRound().call();
    console.log(coinFlipContract);
    console.log(tokenContract);
    console.log(accounts[0]);
    //console.log(await contract.methods.getBalance().call());
    setState({
      account: {
        accounts: accounts,
      },
      coinFlipContractData: coinFlipContract,
      tokenContractData: tokenContract,
      coinFlip: {
        totalRound: totalRounds,
      },
    });
    setIsLoading(false);
  };

  function coinFlip(betChoice) {
    setIsLoading(true);
    axios
      .post("/api/coinflip", {
        betChoice: betChoice,
        _betAmount: _betAmount,
      })
      .then((commitment) => {
        console.log(commitment);
        var _takeBet = state.coinFlipContractData.methods
          .takeBet(state.tokenContractData._address, betChoice, _betAmount)
          .send({ from: state.account.accounts[0] })
          .then((reponse) => {
            console.log(reponse);
            reveal(commitment.data);
          })
          .catch((err) => {
            setIsLoading(false);
            console.log(err.message);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }

  function safeApproveERC20ToCoinFlip() {
    var _safeApproveERC20ToCoinFlip = state.tokenContractData.methods
      .approve(state.coinFlipContractData._address, 1000000000000)
      .send({ from: state.account.accounts[0] })
      .then((reponse) => {
        //reveal(betChoice);
        console.log(reponse);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function safeIncreaseERC20Allowance() {
    var _safeApproveERC20ToCoinFlip = state.coinFlipContractData.methods
      .safeIncreaseERC20Allowance(state.tokenContractData._address, _betAmount)
      .send({ from: state.account.accounts[0] })
      .then((reponse) => {
        //reveal(betChoice);
        console.log(reponse);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function transferERC20ToCoinFlip() {
    var _transferERC20ToCoinFlip = state.coinFlipContractData.methods
      .transferERC20ToCoinFlip(state.tokenContractData._address, _betAmount)
      .send({ from: state.account.accounts[0] })
      .then((reponse) => {
        //reveal(betChoice);
        console.log(reponse);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  function reveal(data) {
    console.log(data);
    axios
      .post("/api/revealResult", {"secretChoice": data.secretChoice, "nonce": data.nonce})
      .then((response) => {
        console.log(response.data.events.GameMessage.returnValues.mesg);
        setIsLoading(false);
        Swal.fire({
          title: "Result",
          text: response.data.events.GameMessage.returnValues.mesg,
          icon: "success",
        });
        // state.coinFlipContractData.methods
        //   .totalRound()
        //   .call()
        //   .then((res) => {
        //     setState({
        //       coinFlip: {
        //         totalRound: res,
        //       },
        //     });
        //   });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
      });
  }

  function result007() {
    // var _takeBet=  state.contractData.methods.result007().call({from:state.account.accounts[0]}).then(response=>{
    //   console.log(response);
    // });
    axios.get("/api/revealResult").then((response) => {
      console.log(response);
    });
  }

  function allRoundsData() {
    var _playerRoundsData = state.coinFlipContractData.methods
      .allRounds(1)
      .call({ from: state.account.accounts[0] })
      .then((response) => {
        console.log(response);
      });
  }

  function eachPlayerRoundsData() {
    var _playerRoundsData = state.coinFlipContractData.methods
      .countOfEachPlayerRound(state.account.accounts[0], 0)
      .call({ from: state.account.accounts[0] })
      .then((response) => {
        console.log(response);
      });
  }

  if (isLoading) {
    return (
      <Flex
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction={"column"}
      >
        <Spinner color="red.500" size="xl" />
        <Text textAlign={"center"} fontSize={"1xl"}>
          Please Wait! Do not refresh or close the browser.
        </Text>
      </Flex>
    );
  }

  return (
    <Flex
      width={"100vw"}
      height={"100vh"}
      alignItems={"center"}
      gap={"5"}
      direction={"column"}
    >
      <Text fontSize={"4xl"} mt="5rem">
        Casino Dapp First Demo
      </Text>
      <Flex width={"100%"} mt={"5rem"}>
        <Flex
          width={"50%"}
          direction={"column"}
          justifyContent="center"
          alignItems={"center"}
          gap={"5"}
        >
          {/* <Text>Connected Account: {state.account.accounts}{state.account.accounts.substring(0, 5) + " ... " + state.account.accounts.slice(-4)}</Text> */}
          <Text>
            Connected Account:{" "}
            {state.account.accounts &&
              String(state.account.accounts).substring(0, 5) +
                " ... " +
                String(state.account.accounts).slice(-4)}
          </Text>
          {/* <Text>Total Round: {coinFlip.totalRound}</Text> */}

          <Button onClick={() => safeApproveERC20ToCoinFlip()}>
            Approve CasinoToken to CoinFlip
          </Button>
          {/* <Button onClick={() => transferERC20TocoinFlip()}>transfer ERC20 To coinFlip </Button> */}
        </Flex>

        <Flex
          width={"50%"}
          direction={"column"}
          justifyContent="center"
          alignItems={"center"}
          gap={"5"}
        >
          <Text fontSize={"2xl"}>Place your bet</Text>
          <Button
            onClick={() => coinFlip(true)}
            width={"5rem"}
            bgColor={"orange.400"}
          >
            Heads{" "}
          </Button>
          <Button
            onClick={() => coinFlip(false)}
            width={"5rem"}
            bgColor={"yellow.400"}
          >
            Tails{" "}
          </Button>
          {/* <Button onClick={() => allRoundsData()}>All Rounds Data </Button>
      <Button onClick={() => eachTextlayerRoundsData()}>
        Each Textlayer Rounds Data{" "}
      </Button> */}
          {/* <Text>-----------Reveal Result------------------</Text>
            <Button onClick={() => result007()}>Reveal Result</Button> */}
        </Flex>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = async () => {
  const COINFLIP_CONTRACT_ADDRESS =
    process.env.COINFLIP_CONTRACT_ADDRESS || null;
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
