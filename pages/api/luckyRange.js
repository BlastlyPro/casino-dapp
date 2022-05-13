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

    let randomNumber;
    let payouts=[
                  {'max':100,'min':91,'payout':1},
                  {'max':90,'min':81,'payout':1.1},
                  {'max':80,'min':71,'payout':1.3},
                  {'max':70,'min':61,'payout':1.4},
                  {'max':60,'min':51,'payout':1.7},
                  {'max':50,'min':41,'payout':2},
                  {'max':40,'min':31,'payout':2.5},
                  {'max':30,'min':21,'payout':3.3},
                  {'max':20,'min':11,'payout':5},
                  {'max':10,'min':2,'payout':10},
                  {'max':1,'min':1,'payout':97}
                ];
     var luckyNumber;
     var playerFlag;
     var playerPayout;
     var payoutDivider;
    coinFlipContractData.methods.getBalance(tokenContract._address).call().then(response=>{
   
      console.log("req.body.normalBetAmount --------------------");
      let normalBetAmount=req.body.normalBetAmount * 1;
      let payoutRange=req.body.betRange.maxRange - req.body.betRange.minRange;

      for(var i=0;i<payouts.length;i++){
        if(payoutRange <= payouts[i].max && payoutRange >= payouts[i].min){
          normalBetAmount=req.body.normalBetAmount * payouts[i].payout;
          playerPayout=payouts[i].payout;
          payoutDivider=10;
        }
      }
      console.log(normalBetAmount);
      var contractBalance=_web3.utils.fromWei(response,'ether');
      console.log("contractBalance--------------------");
      console.log(contractBalance);    
            //////////////////Daddu Please Check/////////
      if( contractBalance < 1000 || contractBalance < normalBetAmount)
      {
        console.log("entering chorai mode");
        luckyNumber=req.body.betRange.maxRange + 1;
        console.log('------------chorai Mode luckyNumber--------------')        
        console.log(luckyNumber)

      }
      else{
        console.log("entering Shadhu mode");
        randomNumber = crypto.randomInt(0, 100);
        console.log(randomNumber);
        luckyNumber=randomNumber;

        console.log('------------req.body.betRange--------------')        
        console.log(req.body.betRange.maxRange)
        console.log(req.body.betRange.minRange)
        console.log('------------payoutRange-----------')
        console.log(payoutRange);
        console.log('------------luckyNumber--------------')        
        console.log(luckyNumber)
      }

      playerFlag= (luckyNumber > req.body.betRange.minRange && luckyNumber < req.body.betRange.maxRange) ? true : false;
      playerPayout= (playerPayout == 97) ? 97 : (playerPayout * 10);
      payoutDivider= (playerPayout == 97) ? 1 : 10;
      console.log('------------playerFlag--------------')         
      console.log(playerFlag)
      console.log('------------playerPayout--------------')               
      console.log(playerPayout)
      console.log('------------Payout Divider--------------')               
      console.log(payoutDivider)
      var obj={'luckyNumber':luckyNumber, 'playerPayout':playerPayout, 'playerFlag':playerFlag, 'payoutDivider':payoutDivider}
      res.status(200).json(obj);
        // coinFlipContractData.methods.luckyRange(req.body.player2Address, req.body._betAmount, req.body.betRange.maxRange, luckyNumber, req.body.txnHash, playerPayout, playerFlag, payoutDivider).send({from: _account.address}).then((reponse)=>{
        //     res.status(200).json(reponse);
        //   }).catch((err)=>{
        //     console.log(err.message);
        //   });
    }) 

  }
}
