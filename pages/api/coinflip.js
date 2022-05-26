const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const crypto = require("crypto");
import CoinFlipPrediction from "../../lib/abi.json";

export default function handler(req, res) {
  const provider = new HDWalletProvider(PRIVATE_KEY, NODE_PROVIDER);
  const _web3 = new Web3(provider);

  const PRIVATE_KEY = process.env.GAS_FEE_WALLET_PRIVATE_KEY;
  const NODE_PROVIDER = process.env.NODE_PRODIVER_URL;
  const COINFLIP_CONTRACT_ADDRESS = _web3.utils.toChecksumAddress(process.env.COINFLIP_CONTRACT_ADDRESS);
  const TOKEN_CONTRACT_ADDRESS = _web3.utils.toChecksumAddress(process.env.TOKEN_CONTRACT_ADDRESS);

  const coinFlipContractData = new _web3.eth.Contract(CoinFlipPrediction.abi, COINFLIP_CONTRACT_ADDRESS);

  let secretChoice = false;
  let randomNumber;
  coinFlipContractData.methods
    .getBalance(TOKEN_CONTRACT_ADDRESS)
    .call()
    .then((response) => {
      console.log("req.body.normalBetAmount --------------------");
      let normalBetAmount = req.body.normalBetAmount * 2;
      console.log(normalBetAmount);
      var contractBalance = _web3.utils.fromWei(response, "ether");
      console.log("contractBalance--------------------");
      console.log(contractBalance);
      //////////////////Daddu Please Check/////////
      //if((req.body.betAmount) * 2 > _web3.utils.fromWei(response,'ether'))
      if (contractBalance < 1000 || contractBalance < normalBetAmount) {
        console.log("entering chorai mode");
        if (req.body.betChoice == true) {
          secretChoice = false;
        } else {
          secretChoice = true;
        }
      } else {
        console.log("entering Shadhu mode");
        randomNumber = crypto.randomInt(0, 1000000);
        console.log(randomNumber);
        if (randomNumber % 2 == 0) {
          secretChoice = true;
        }
      }
      var obj = { secretChoice: secretChoice };
      res.status(200).json(obj);
      // coinFlipContractData.methods.takeBet(req.body.player2Address, req.body.betChoice, req.body.betAmount, hash, secretChoice, nonce, req.body.txnHash ).send({from: _account.address}).then((reponse)=>{
      //     res.status(200).json(reponse);
      //   }).catch((err)=>{
      //     console.log(err.message);
      //   });
    });
}
