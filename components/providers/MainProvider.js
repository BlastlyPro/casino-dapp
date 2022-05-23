import { useState, useEffect, createContext } from "react";
import Web3 from "web3";
import CoinFlipPrediction from "../../lib/abi.json";
import Mgtoken from "../../lib/tokenContractAbi.json";
import { parse, stringify } from "flatted";
import {COINFLIP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, NODE_PRODIVER_URL} from "../../env";

export const MainContext = createContext();

export function MainProvider({ children }) {
  const [state, setState] = useState({
    account: null,
    metaData: [],
    web3: null,
    coinFlipContractData: {},
    coinFlip: {
      totalRound: 0,
    },
  });
  const [betAmount, setBetAmount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allRounds, setAllRounds] = useState(null);

  // Get state from local storage on mount
  useEffect(() => {
    const init = async () => {
      await checkWeb3();
    };
    init();
    // check localstorage for state
    if (localStorage.getItem("state")) {
      // update state from localstorage
      const stateFromStorage = localStorage.getItem("state");
      setState(parse(stateFromStorage));
    }
  }, []);

  // update state in localstorage on mount and on state change
  useEffect(() => {
    // set localstorage from state
    localStorage.setItem("state", stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.web3) initBlockchainData();
  }, [state.web3]);

  const connect = async () => {
    window.ethereum
      .request({ method: "eth_requestAccounts" })
      .then((accounts) => {
        setState((prevState) => ({ ...prevState, account: accounts[0] }));
      })
      .catch((err) => {
        if (err.code === 4001) {
          console.log("Please connect to MetaMask.");
        } else {
          console.error(err);
        }
      });
  };

  const checkWeb3 = async () => {
    // if metamask present
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await initWeb3WithMetamask();
      setIsLoading(false);
    } else if (window.web3) {
      // if metamask not present
      initWeb3WithoutWallet();
      setIsLoading(false);
    } else {
      // if metamask not present
      initWeb3WithoutWallet();
      setIsLoading(false);
      window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
  };

  const initWeb3WithoutWallet = async () => {
    const speedyNode = NODE_PRODIVER_URL;
    const web3 = new Web3(new Web3.providers.HttpProvider(speedyNode));
    setState((prevState) => ({
      ...prevState,
      web3: web3,
    }));
  };

  const initWeb3WithMetamask = async () => {
    const web3 = window.web3;
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        setState((prevState) => ({ ...prevState, account: accounts[0], web3: web3 }));
      })
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });
  };

  const initBlockchainData = async () => {
    const coinFlipaddress = COINFLIP_CONTRACT_ADDRESS;
    const tokenContractAddres = TOKEN_CONTRACT_ADDRESS;
    const abi = CoinFlipPrediction.abi;
    const tokenContractAbi = Mgtoken.abi;
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

    let contractBalance = await coinFlipContract.methods.getBalance(tokenContractAddres).call();
    contractBalance = web3.utils.fromWei(contractBalance, "ether");
    let PROJECT_FEE = await coinFlipContract.methods.PROJECT_FEE().call();
    PROJECT_FEE = (PROJECT_FEE / 1000) * 100;
    let houseTotalFee = await coinFlipContract.methods.houseTotalFee().call();
    houseTotalFee = web3.utils.fromWei(houseTotalFee, "ether");

    if (state.account) {
      let walletBalance = await tokenContract.methods.balanceOf(state.account).call();
      walletBalance = web3.utils.fromWei(walletBalance, "ether");
      let balanceInsideContract = await coinFlipContract.methods.allUsers(state.account).call();
      balanceInsideContract = web3.utils.fromWei(balanceInsideContract, "ether");
      setState((prevState) => ({
        ...prevState,
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
      }));
    }

    setState((prevState) => ({
      ...prevState,
      coinFlipContractData: coinFlipContract,
      tokenContractData: tokenContract,
      coinFlip: {
        totalRound: totalRound,
        contractBalance: contractBalance,
        PROJECT_FEE: PROJECT_FEE,
        houseTotalFee: houseTotalFee,
      },
    }));

    setIsLoading(false);
  };

  function handleChange(e) {
    setBetAmount(e.target.value);
  }

  return (
    <MainContext.Provider
      value={{
        stateData: [state, setState],
        betAmountData: [betAmount, setBetAmount],
        allRoundsData: [allRounds, setAllRounds],
        handleChange: handleChange,
        connect: connect,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
