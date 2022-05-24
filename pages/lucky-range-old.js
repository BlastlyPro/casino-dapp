import { useState, useEffect, useContext } from "react";
import { Flex, Text, Button, Divider, Input, Box, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";
import { MainContext } from "../components/providers/MainProvider";

export default function LuckyRange() {
  const { stateData, betAmountData, handleChange } = useContext(MainContext);
  const [state, setState] = stateData;
  const [betAmount, setBetAmount] = betAmountData;
  const [minRange, setMinRange] = useState(null);
  const [maxRange, setMaxRange] = useState(null);
  const [totalRound, setTotalRound] = useState(null);
  const [allRounds, setAllRounds] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (blastlyContractData.methods) {
        let totalRound = await blastlyContractData.methods.totalLuckyRangeRound().call();
        setTotalRound(totalRound);
        let _allRounds = [];

        for (var i = 1; i <= totalRound; i++) {
          var roundObj = await blastlyContractData.methods.luckyRangeRounds(i).call();
          roundObj.player2BetAmount = web3.utils.fromWei(roundObj.player2BetAmount, "ether");
          _allRounds.push(roundObj);
        }
        setAllRounds(_allRounds);
      }
    };
    init();
  }, [state]);

  function openLink(_txnHash) {
    window.open(`https://testnet.bscscan.com/tx/` + _txnHash);
  }

  function inputLuckyRange(e, rangeString) {
    var obj = {};
    if (rangeString == "min") {
      setMinRange(e.target.value);
    }
    if (rangeString == "max") {
      setMaxRange(e.target.value);
    }
  }
  async function submitLuckyRange() {
    var range = { minRange: minRange, maxRange: maxRange };
    var bta = state.web3.utils.toWei(String(betAmount), "ether");
    var secretKeyGen;
    ////////////////////////////////////////
    let allowance = await state.tokenContractData.methods.allowance(state.account, blastlyContractData._address).call();
    console.log(allowance);
    axios.post("/api/secretKeyGenerate", { player2Address: state.account }).then((response) => {
      // console.log("------------Secret Key ------------");
      //   console.log(response.data);
      secretKeyGen = response.data;
      axios.post("/api/luckyRange", { betRange: range, betAmount: bta, normalBetAmount: betAmount, player2Address: state.account, txnHash: "0xxxxxx" }).then((response) => {
        console.log(response);
        console.log("=------------- allowance -----------------");

        if (allowance < bta) {
          state.tokenContractData.methods
            .approve(blastlyContractData._address, state.web3.utils.toWei(String(9 * 1e18), "ether"))
            .send({ from: state.account })
            .then((res) => {
              callLuckyRange(bta, response, secretKeyGen);
            });
        } else {
          console.log("Direct calling lucky range sol");
          callLuckyRange(bta, response, secretKeyGen);
        }
      });
    });
  }
  function callLuckyRange(bta, response, secretKeyGen) {
    blastlyContractData.methods
      .luckyRange(state.account, bta, maxRange, response.data.luckyNumber, " ", response.data.playerPayout, response.data.playerFlag, response.data.payoutDivider, secretKeyGen)
      .send({ from: state.account })
      .then((reponse007) => {
        //                      console.log(reponse007.transactionHash)
        Swal.fire({
          title: "Result",
          text: reponse007.events.GameMessage.returnValues.mesg,
          icon: "success",
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  return (
    <>
      {/* <h1>Welcome to Lucky Range Game</h1>
      <h1>TOTAL Lucky Range Game:{totalRound}</h1>
      <Input width="10%" color="black" placeholder="Input Min Range" onChange={(e) => inputLuckyRange(e, "min")} />
      <Input width="10%" color="black" placeholder="Input Max Range" onChange={(e) => inputLuckyRange(e, "max")} /> */}
      <Input width="10%" color="black" placeholder="Input Money" onChange={(e) => handleChange(e)} />
      <Button color="black" onClick={() => submitLuckyRange()}>
        Try Your Luck
      </Button>

      {allRounds && allRounds.length > 0 ? (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Previous Rounds Results</TableCaption>
            <Thead>
              <Tr>
                <Th>Round ID</Th>
                <Th>Txn Hash</Th>
                <Th>Player</Th>
                <Th>Amount</Th>
                <Th>Player Bet Range</Th>
                <Th>Result</Th>
              </Tr>
            </Thead>
            <Tbody>
              {allRounds
                .slice(0)
                .reverse()
                .map((round, i) => (
                  <Tr key={i} color="black">
                    <Td>{i + 1}</Td>
                    <Td cursor={"pointer"} onClick={() => openLink(round.txnHash)}>
                      {round.txnHash.substring(0, 7) + " ... " + round.txnHash.slice(-6)}
                    </Td>
                    <Td>{round.player2Address.substring(0, 5) + " ... " + round.player2Address.slice(-4)}</Td>
                    <Td>{round.player2BetAmount}</Td>
                    <Td>{"<" + round.luckyRangeBet}</Td>
                    <Td>{round.luckyNumber}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        "No result to Show"
      )}
    </>
  );
}
