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
      console.log(response);
      var contractBalance=_web3.utils.fromWei(response,'ether');

      //////////////////Daddu Please Check/////////
      //if((req.body._betAmount) * 2 > _web3.utils.fromWei(response,'ether'))
      if( contractBalance < _web3.utils.fromWei('1000','ether'))
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
        coinFlipContractData.methods.CoinFlip(hash).send({from: _account.address}).then((reponse)=>{                
          const hashObject={'hash':hash,'nonce':nonce,'secretChoice':secretChoice,'randomNumber':randomNumber};        
          // res.send(hashObject);
          res.status(200).json(hashObject);
          }).catch((err)=>{
            console.log(err.message);
          });                
    }) 

  }
}
