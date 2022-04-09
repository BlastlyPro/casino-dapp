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
  NETWORK_ID,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    account: {},
    metaData: [],
    coinFlipContractData: {},
    coinFlip: {
      totalRound: 0,
    },
  });
  const [allRounds, setAllRounds]=useState(null);
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
      roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount,"ether");
      roundObj.player2BetChoice =roundObj.player2BetChoice == true ? "Heads" : "Tails";
      roundObj.winningPosition =roundObj.winningPosition == true ? "Heads" : "Tails";
      _allRounds.push(roundObj);
    }
    setAllRounds(_allRounds);
    console.log(coinFlipContract);
    console.log(tokenContract);
    console.log(accounts[0]);

    let contractBalance = await coinFlipContract.methods.getBalance(TOKEN_CONTRACT_ADDRESS).call();
    let walletBalance = await tokenContract.methods.balanceOf(accounts[0]).call();
    let balanceInsideContract=await coinFlipContract.methods.allUsers(accounts[0]).call();
    walletBalance = web3.utils.fromWei(walletBalance, "ether");
    contractBalance = web3.utils.fromWei(contractBalance, "ether");
    balanceInsideContract= web3.utils.fromWei(balanceInsideContract, "ether");
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
        balanceInsideContract:balanceInsideContract
   
      },
    });

    setIsLoading(false);
  };

  async function coinFlip(betChoice) {

    var bta = state.web3.utils.toWei(String(_betAmount), "ether");    
    setIsLoading(true);
     await state.tokenContractData.methods.transfer(state.coinFlipContractData._address,bta).send({ from: state.account.accounts[0] }).then((reponse) => {
      console.log(reponse.transactionHash)
    ////////////////////////////////////////////
        axios.post("/api/coinflip", {betChoice: betChoice, _betAmount: bta, normalBetAmount: _betAmount,player2Address: state.account.accounts[0], txnHash: reponse.transactionHash}).then((response) => {
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
  async function claimBonus(){
    setIsLoading(true);
    state.coinFlipContractData.methods.claim().send({ from: state.account.accounts[0] }).then(response => {
        setIsLoading(false);
        Swal.fire({
          title: "Result",
          text: "Please Check your Wallet",
          icon: "success",
        }); 
    })
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
              <Text fontWeight={"bold"}>
                Balance Inside Contract:{" "}
                {Number(state.coinFlip.balanceInsideContract).toFixed(2)} {" "}
                <Button  bgColor={"yellow.400"} onClick={() => claimBonus()}>Claim Bonus</Button>
              </Text>              
              <Text>Total Round: {state.coinFlip.totalRound}</Text>
            </>
          ) : (
            <Text>No Contract Balance</Text>
          )}
          {/* <Button
            onClick={() => safeApproveERC20ToCoinFlip()}
            disabled={isLoading}
          >
            Approve CasinoToken to CoinFlip
          </Button> */}
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
          <TransactionTable allRounds={allRounds} />
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
