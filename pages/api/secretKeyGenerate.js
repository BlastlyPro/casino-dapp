var fs = require('fs');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3=require('web3');
const crypto = require('crypto');
const abi = require('ethereumjs-abi');
import CoinFlipPrediction from "../../lib/abi.json";

// const PRIVATE_KEY = process.env.GAS_FEE_WALLET_PRIVATE_KEY;
const PRIVATE_KEY = '0xde946e372541d6146f44459847bc85f405973bd072ac4a32a0df1d6950f6ee02';
const NODE_PROVIDER = process.env.NODE_PRODIVER_URL;
const COINFLIP_CONTRACT_ADDRESS = process.env.COINFLIP_CONTRACT_ADDRESS;

export default function handler(req, res) {

  if (typeof web3 !== 'undefined') {
    const web3 = new Web3(web3.currentProvider); 
  } else {

    const provider = new HDWalletProvider(PRIVATE_KEY, NODE_PROVIDER); 
    const _web3 = new Web3(provider);
    const _account = _web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    console.log("secret key generate account")
    console.log(_account);
    const coinFlipContractData = new _web3.eth.Contract(CoinFlipPrediction.abi, COINFLIP_CONTRACT_ADDRESS);

    const nonce = "0x" + crypto.randomBytes(32).toString('hex');
    const hash = "0x" + abi.soliditySHA3(["bool", "uint256"],[true, nonce]).toString('hex');
    coinFlipContractData.methods._secretKeys(req.body.player2Address,hash).send({from: _account.address}).then((reponse)=>{                
        res.status(200).json(hash);
      }).catch((err)=>{
        console.log(err.message);
      });

  }
}
