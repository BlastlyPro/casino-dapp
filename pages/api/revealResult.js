const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
import CoinFlipPrediction from "../../lib/abi.json";

const PRIVATE_KEY = process.env.GAS_FEE_WALLET_PRIVATE_KEY;
const NODE_PROVIDER = process.env.NODE_PRODIVER_URL;
const COINFLIP_CONTRACT_ADDRESS = process.env.COINFLIP_CONTRACT_ADDRESS;

export default function handler(req, res) {

  if (typeof web3 !== 'undefined') {
    const web3 = new Web3(web3.currentProvider); 
  } else {
    const provider = new HDWalletProvider(PRIVATE_KEY, NODE_PROVIDER); 
    const _web3 = new Web3(provider);
    const _account = _web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const coinFlipContractData = new _web3.eth.Contract(CoinFlipPrediction.abi, COINFLIP_CONTRACT_ADDRESS);

    ////////////////Smart Contract Coin Reveal Call //////////////////
    coinFlipContractData.methods
      .reveal(req.body.secretChoice, req.body.nonce)
      .send({ from: _account.address })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
