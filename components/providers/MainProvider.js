import { useState, useEffect, createContext } from "react";
import Web3 from "web3";
import { COINFLIP_CONTRACT_ADDRESS, TOKEN_CONTRACT_ADDRESS, NODE_PRODIVER_URL } from "../../env";
import CoinFlipPrediction from "../../lib/abi.json";
import Mgtoken from "../../lib/tokenContractAbi.json";
import { createClient } from '@supabase/supabase-js'
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";


export const MainContext = createContext();

export function MainProvider({ children }) {
  const [state, setState] = useState({
    account: null,
    coinFlipTotalRound: 0,
  });
  const [web3, setWeb3] = useState(null);

  // Get state from local storage on mount
  // init web3 on mount
  useEffect(() => {
    const initWeb3 = async () => {
      // if window is not undefined
      if (typeof window !== "undefined") {
        // if metamask present
        if (window.ethereum) {
          await initWeb3WithMetamask();
        } else if (window.web3) {
          // if metamask not present
          await initWeb3WithoutWallet();
        } else {
          // if metamask not present
          await initWeb3WithoutWallet();

          window.alert("Non-Ethereum browser detected. You should consider trying MetaMask!");
        }
      }
    };
    initWeb3();
    // check localstorage for state
    if (localStorage.getItem("state")) {
      // update state from localstorage
      setState(JSON.parse(localStorage.getItem("state")));
    }
  }, []);

  // update state in localstorage on mount and on state change
  useEffect(() => {
    // set localstorage from state
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  const connect = async () => {
      const providerOptions = {
        // binancechainwallet: {
        //   package: true
        // }
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            network: "binance", // required
            rpc: {
              56: 'https://bsc-dataseed.binance.org/'
            },
          network: 'mainnet', 
          }
        }      
      };    
      const web3Modal = new Web3Modal({
        providerOptions // required
      });
      const provider = await web3Modal.connect();
      let _accounts=web3.eth.getAccounts().then(acc => {
        console.log(acc[0]);
        setState((prevState) => ({ ...prevState, account: acc[0] }));
      });
    // window.ethereum
    //   .request({ method: "eth_requestAccounts" })
    //   .then((accounts) => {
    //     setState((prevState) => ({ ...prevState, account: accounts[0] }));
    //   })
    //   .catch((err) => {
    //     if (err.code === 4001) {
    //       console.log("Please connect to MetaMask.");
    //     } else {
    //       console.error(err);
    //     }
    //   });
  };

  const initWeb3WithoutWallet = async () => {
    console.log("initWeb3WithoutWallet");
    const speedyNode = NODE_PRODIVER_URL;
    setWeb3(new Web3(new Web3.providers.HttpProvider(speedyNode)));
  };

  const initWeb3WithMetamask = async () => {
    console.log("initWeb3WithMetamask");    
    setWeb3(new Web3(window.ethereum));
    window.ethereum
      .request({ method: "eth_accounts" })
      .then((accounts) => {
        setState((prevState) => ({ ...prevState, account: accounts[0] }));
      })
      .catch((err) => {
        // Some unexpected error.
        // For backwards compatibility reasons, if no accounts are available,
        // eth_accounts will return an empty array.
        console.error(err);
      });
  };

  function getContractsData() {
   
    const blastlyAddress = COINFLIP_CONTRACT_ADDRESS;
    const tokenContractAddres = TOKEN_CONTRACT_ADDRESS;
    const abi = CoinFlipPrediction.abi;
    const tokenContractAbi = Mgtoken.abi;
    const blastlyContract = new web3.eth.Contract(abi, blastlyAddress);
    const tokenContract = new web3.eth.Contract(tokenContractAbi, tokenContractAddres);
    const supabaseUrl="https://zqpbcyxunayfuhmumztp.supabase.co";
    const supabaseAnonKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxcGJjeXh1bmF5ZnVobXVtenRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTM1MDI2ODUsImV4cCI6MTk2OTA3ODY4NX0.GfWPApbl3Y1fNaGbNUfr8maMbFvxlcAb_B88xTSp3M0";
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    return { blastlyContract, tokenContract, supabase };
  }
 if(web3){
  return (
    <MainContext.Provider
      value={{
        stateData: [state, setState],
        web3Data: [web3, setWeb3],
        connect: connect,
        getContractsData: getContractsData,
      }}
    >
      {children}
    </MainContext.Provider>
  );
 }
 else{
   return(
     <>Loading</>
   )
 }

}
