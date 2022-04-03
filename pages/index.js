import {
  Flex,
  Text,
  Button,
  Spinner,
  InputGroup,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3 from "web3";
import CoinFlipPrediction from "../lib/abi.json";
import Mgtoken from "../lib/tokenContractAbi.json";
import Swal from "sweetalert2";
import TransactionTable from "../components/TransactionTable";

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
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
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
    const tokenContract = new web3.eth.Contract(
      tokenContractAbi,
      tokenContractAddres
    );
    let totalRound = await coinFlipContract.methods.totalRound().call();
    let _allRounds = [];
    for (var i = 1; i <= totalRound; i++) {
      var roundObj = await coinFlipContract.methods.allRounds(i).call();
      roundObj.player2BetAmount = web3.utils.fromWei(
        roundObj.player2BetAmount,
        "ether"
      );
      roundObj.player2BetChoice =
        roundObj.player2BetChoice == true ? "Heads" : "Tails";
      roundObj.winningPosition =
        roundObj.winningPosition == true ? "Heads" : "Tails";
      _allRounds.push(roundObj);
    }
    console.log(coinFlipContract);
    console.log(tokenContract);
    console.log(accounts[0]);

    let contractBalance = await coinFlipContract.methods
      .getBalance(TOKEN_CONTRACT_ADDRESS)
      .call();
    let walletBalance = await tokenContract.methods
      .balanceOf(accounts[0])
      .call();
    walletBalance = web3.utils.fromWei(walletBalance, "ether");
    console.log(walletBalance);
    contractBalance = web3.utils.fromWei(contractBalance, "ether");
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
        allRounds: _allRounds,
      },
    });

    setIsLoading(false);
  };

  function coinFlip(betChoice) {
    var bta = state.web3.utils.toWei(String(_betAmount), "ether");
    setIsLoading(true);
    axios
      .post("/api/coinflip", {
        betChoice: betChoice,
        _betAmount: bta,
      })
      .then((commitment) => {
        console.log(commitment.data.secretChoice);
        state.coinFlipContractData.methods
          .takeBet(
            state.tokenContractData._address,
            betChoice,
            bta,
            commitment.data.secretChoice
          )
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
      .approve(
        state.coinFlipContractData._address,
        state.web3.utils.toWei("1000000000000", "ether")
      )
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
      .post("/api/revealResult", {
        secretChoice: data.secretChoice,
        nonce: data.nonce,
      })
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
      {isLoading && <Spinner color="red.500" size="xl" />}
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

          {state.coinFlip ? (
            <>
              <Text fontWeight={"bold"}>
                Total Contract Balance:{" "}
                {Number(state.coinFlip.contractBalance).toFixed(5)}
              </Text>
              <Text fontWeight={"bold"}>
                Wallet Balance:{" "}
                {Number(state.coinFlip.walletBalance).toFixed(5)}
              </Text>
              <Text>Total Round: {state.coinFlip.totalRound}</Text>
            </>
          ) : (
            <Text>No Contract Balance</Text>
          )}
          <Button
            onClick={() => safeApproveERC20ToCoinFlip()}
            disabled={isLoading}
          >
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
          <InputGroup
            bgColor="gray.100"
            mb={4}
            border="none"
            borderColor="#fff"
            borderRadius="10px"
            width={"30%"}
          >
            <Input
              type="number"
              placeholder="0.00"
              borderRadius="10px"
              color={"gray.900"}
              fontSize="md"
              onChange={(e) => handleChange(e)}
            />
          </InputGroup>
          <Flex gap={5}>
            <Button
              disabled={isLoading}
              onClick={() => coinFlip(true)}
              width={"5rem"}
              bgColor={"orange.400"}
            >
              Head
            </Button>
            <Button
              disabled={isLoading}
              onClick={() => coinFlip(false)}
              width={"5rem"}
              bgColor={"yellow.400"}
            >
              Tail
            </Button>
          </Flex>
          {/* <Button onClick={() => allRoundsData()}>All Rounds Data </Button>
      <Button onClick={() => eachTextlayerRoundsData()}>
        Each Textlayer Rounds Data{" "}
      </Button> */}
          {/* <Text>-----------Reveal Result------------------</Text>
            <Button onClick={() => result007()}>Reveal Result</Button> */}
        </Flex>
      </Flex>
      <Flex direction={"column"} mt={"3rem"}>
        <Text fontSize={"2xl"}>Transaction History</Text>
        {state.coinFlip ? (
          <TransactionTable allRounds={state.coinFlip.allRounds} />
        ) : null}
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
