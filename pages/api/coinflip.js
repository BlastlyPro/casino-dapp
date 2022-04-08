var fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3=require('web3');
const crypto = require('crypto');
const abi = require('ethereumjs-abi');
import CoinFlipPrediction from "../../lib/abi.json";
import Mgtoken from "../../lib/tokenContractAbi.json";

const PRIVATE_KEY = process.env.GAS_FEE_WALLET_PRIVATE_KEY;
const NODE_PROVIDER = process.env.NODE_PRODIVER_URL;
const COINFLIP_CONTRACT_ADDRESS = process.env.COINFLIP_CONTRACT_ADDRESS;
const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS;

export default function handler(req, res) {

  if (typeof web3 !== 'undefined') {
    const web3 = new Web3(web3.currentProvider); 
  } else {
    const provider = new HDWalletProvider(PRIVATE_KEY, NODE_PROVIDER); 
    const _web3 = new Web3(provider);
    const _account = _web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const coinFlipContractData = new _web3.eth.Contract(CoinFlipPrediction.abi, COINFLIP_CONTRACT_ADDRESS);
    const tokenContract = new _web3.eth.Contract(Mgtoken.abi, TOKEN_CONTRACT_ADDRESS);
    
    let secretChoice = false;
    let randomNumber;
    coinFlipContractData.methods.getBalance(tokenContract._address).call().then(response=>{

      console.log("req.body.normalBetAmount --------------------");
      let normalBetAmount=req.body.normalBetAmount * 2;
      console.log(normalBetAmount);
      var contractBalance=_web3.utils.fromWei(response,'ether');
      console.log("contractBalance--------------------");
      console.log(contractBalance);
      //////////////////Daddu Please Check/////////
      //if((req.body._betAmount) * 2 > _web3.utils.fromWei(response,'ether'))
      if( contractBalance < 1000 || contractBalance < normalBetAmount)
      {
        console.log("entering chorai mode");
        if(req.body.betChoice==true){
          secretChoice=false;
        }
        else{
          secretChoice=true;
        }
      }
      else{
        console.log("entering Shadhu mode");
        randomNumber = crypto.randomInt(0, 1000000);
        console.log(randomNumber);
        if(randomNumber%2==0){  
            secretChoice=true;
        }            
      }
        const nonce = "0x" + crypto.randomBytes(32).toString('hex');
        const hash = "0x" + abi.soliditySHA3(["bool", "uint256"],[secretChoice, nonce]).toString('hex');                 
        coinFlipContractData.methods.takeBet(req.body.player2Address, req.body.betChoice, req.body._betAmount, hash, secretChoice, nonce, req.body.txnHash ).send({from: _account.address}).then((reponse)=>{                
        
            res.status(200).json(reponse);
          }).catch((err)=>{
            console.log(err.message);
          });                
    }) 

  }
}
