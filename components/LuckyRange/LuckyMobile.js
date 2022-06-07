import { useState, useEffect, useContext } from "react";
import { Flex, Text,  chakra, Button, Divider, Input, Box, useMediaQuery, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";
import RightColumnLucky from "./RightColumnLucky";
import LeftColumnLucky from "./LeftColumnLucky";
import Swal from "sweetalert2";
import { MainContext } from "../providers/MainProvider";

export default function LuckyMobile({ allRounds}) {
  const { stateData, web3Data, getContractsData } = useContext(MainContext);
  const [web3] = web3Data;
  const [state] = stateData;
  const [value, setValue] = useState(1);
  const [minRange, setMinRange] = useState(10);
  const [maxRange, setMaxRange] = useState(65);
  const [betAmount, setBetAmount] = useState(0);

  function handleBetAmount(e) {
    setBetAmount(e.target.value);
  }

  function setRanges(values) {
    setMinRange(values[0]);
    setMaxRange(values[1]);
  }

  const handleSubmit = async () => {
    // check if the user is connected
    if (!state.account) {
      Swal.fire({
        title: "Please connect your wallet to play",
        icon: "warning",
      });
      return;
    }

    if (minRange == null || maxRange == null) {
      Swal.fire({
        title: "Please select a range!",
        icon: "error",
      });
      return;
    }

    if (betAmount < 10) {
      Swal.fire({
        title: "Please enter a bet amount atleast 10!",
        icon: "error",
      });
      return;
    }

    setValue(2);
    await executeLuckyRange(minRange, maxRange, betAmount);
  };

  async function executeLuckyRange(minRange, maxRange, betAmount) {
    // return "hola"
    const { blastlyContract, tokenContract } = getContractsData();
    var range = { minRange: minRange, maxRange: maxRange };
    var bta = web3.utils.toWei(String(betAmount), "ether");
    var secretKeyGen;
    ////////////////////////////////////////
    let allowance = await tokenContract.methods.allowance(state.account, blastlyContract._address).call();
    console.log(allowance);
    axios.post("/api/secretKeyGenerate", { player2Address: state.account }).then((response) => {
      // console.log("------------Secret Key ------------");
      //   console.log(response.data);
      secretKeyGen = response.data;
      axios.post("/api/luckyRange", { betRange: range, betAmount: bta, normalBetAmount: betAmount, player2Address: state.account, txnHash: "0xxxxxx" }).then(async (response) => {
        console.log(response);
        console.log("=------------- allowance -----------------");
        if (allowance < bta) {
          await tokenContract.methods
            .approve(blastlyContract._address, web3.utils.toWei(String(9 * 1e18), "ether"))
            .send({ from: state.account })
            .then(async (res) => {
             await callLuckyRange(bta, response, secretKeyGen, betAmount);
            });
        } else {
          console.log("Direct calling lucky range sol");
          await callLuckyRange(bta, response, secretKeyGen, betAmount);
        }
      });
    });
  }

    async function callLuckyRange(bta, response, secretKeyGen, normalBetAmount) {

      const { blastlyContract } = getContractsData();
      var _txnHash;
      await blastlyContract.methods.luckyRange(state.account, bta, maxRange, response.data.luckyNumber, "0x", response.data.playerPayout, response.data.playerFlag, response.data.payoutDivider, secretKeyGen).send({ from: state.account })
        .then((reponse007) => {
          setValue(3);        
          _txnHash= reponse007.transactionHash;
          // Swal.fire({
          //   title: "Result",
          //   text: reponse007.events.GameMessage.returnValues.mesg,
          //   icon: "success",
          // });
          // console.log(reponse007.events.GameMessage.returnValues.mesg);
          // _setShowResult(reponse007.events.GameMessage.returnValues.mesg);
        })
        .catch((err) => {
          console.log(err.message);
        });
        const { supabase } = getContractsData();     
        let {data, err, stat}=await supabase.from('luckyRange').insert([
          { player2Address: state.account, player2BetAmount:normalBetAmount, minRange:minRange,  maxRange:maxRange,  luckyNumber: response.data.luckyNumber, txn:_txnHash, playerPayout:response.data.playerPayout / response.data.payoutDivider}
        ]);
     
    }

  async function claimBonus() {
    const { blastlyContract } = getContractsData();
    blastlyContract.methods
      .claim()
      .send({ from: state.account })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Please Check your Wallet",
          icon: "success",
        });
      });
  }
  return (
    /* mother flex for all start */
    <Flex w="85%" direction={"column"}>
      <Flex pb="2rem" direction={"column"} alignItems="center" justifyContent="center">
        <Text fontSize="6xl" fontWeight="bold" color={"#FFFFFF"}>
          Lucky Range
        </Text>
        <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.8)"} pb="2rem">
          Try your luck and choose range between 0-99. Smaller spectrum gives higher odds
        </Text>
      </Flex>
      <Flex w="100%" gap="2" direction={["column", "column", "column", "row", "row"]}>
        {/*  {isLargerThan993 ? (
        <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
      ) : null} */}

      {value == 1 && (
        <Flex w={["100%", "100%", "100%", "50%", "50%"]} alignItems="center" justifyContent="center" direction="column">
        <Flex bgColor={"rgba(86, 146, 250, 0.6)"} w={["100%", "100%", "100%", "94%", "94%"]} h={["41.25rem", "41.25rem", "41.25rem", "41.25rem", "41.25rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"}>
          <Flex direction={"Column"} pt="1.5rem">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
              Choose Your Spectrum!
            </Text>
            <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
              Guess your range & win accordingly
            </Text>
          </Flex>
          
          <Flex justifyContent={"center"} p="2rem">
            <Flex transform="rotate(-90deg)" pr="2rem" pb="1rem">
              <Image width="90px" height="116.99px" src="/ten.svg" alt="ten" />
            </Flex>

            <RangeSlider aria-label={["min", "max"]} colorScheme="pink" defaultValue={[10, 30]} orientation="vertical" minH="12rem">
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Flex transform="rotate(90deg)" pr="2rem" pb="1rem">
              <Image width="90px" height="116.99px" src="/sixtyfive.svg" alt="sixtyfive" />
            </Flex>
          </Flex>

          <Flex alignSelf={"center"} direction={["column", "column", "column", "row", "row"]}>
            <Flex h="3rem" border="none" w="13.125rem" bgColor="white" fontSize="xs" color={"black"} borderRadius="30px 30px 0 0">
              <Flex pl="0.3rem" alignItems={"center"} justifyContent={"center"}>
                <Image width="20px" height="20px" src="/inputFrame.png" alt="inputFrame" />
                <Input border="none" bgColor="white" fontSize="xs" w="8rem" color={"#102542CC"} borderRadius="30px" placeholder={"1000BLAST"} onChange={(e) => handleChange(e)} />
              </Flex>
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Image width="16px" height="16px" src="/InputArrow.png" alt="InputArrow" />
              </Flex>
            </Flex>
            <Button
              alignItems="center"
              justifyContent={"center"}
              borderRadius="0 0 30px 30px"
              w="13.12rem"
              h="3rem"
              _hover={{ textDecor: "none" }}
              border="none"
              outline="none"
              cursor="pointer"
              zIndex={"999"}
              bgColor={"#102542"}
              fontSize="xs"
              color={"white"}
              onClick={() => setValue(2)}
            >
              <Text _hover={{ transform: "scale(1.2)" }} transition={"all .5s"}>
                Place Your Bet!
              </Text>
            </Button>
          </Flex>
          <Text textAlign="center" fontSize="sm" color={"white"} p="2rem">
            Your odds: 2.317x
          </Text>
          <Text textAlign="center" fontSize="sm" color={"white"} px="2rem">
            Winning Payout: 1980.00 BNB
          </Text>
        </Flex>
      </Flex> 
      )}



      {value == 2 && (
        <Flex w={["100%", "100%", "100%", "50%", "50%"]} alignItems="center" justifyContent="center" direction="column">
        <Flex
        background="rgba(255, 255, 255, 0.6)"
          w={["100%", "100%", "100%", "94%", "94%"]}
          h={["30.25rem", "30.25rem", "30.25rem", "41.25rem", "41.25rem"]}
          opacity={".9"}
          backdrop-filter="blur(20px)"
          borderRadius="1rem"
          direction={"Column"}
          gap="3rem"
        >
          <Flex direction={"Column"} pt="1.5rem">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
            Good luck!
            </Text>
            <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
            Please hold, we are calculating Your bet!
            </Text>
          </Flex>
  
        
          <Flex justifyContent={"center"}>
          <Image width="163.33px" height="163.33px" src={"/load.gif"} alt="right" />
        </Flex>

        <Flex justifyContent={"center"}>
          <Image width="100px" height="30pxpx" src={"/loadn.gif"} alt="right" />
        </Flex>
      
        </Flex>
      </Flex>
      )}


      

      {value == 3 && (
        <Flex w={["100%", "100%", "100%", "50%", "50%"]} alignItems="center" justifyContent="center" direction="column">
        <Flex
          bgColor={"rgba(86, 146, 250, 0.6)"}
          w={["100%", "100%", "100%", "94%", "94%"]}
          h={["41.25rem", "41.25rem", "41.25rem", "41.25rem", "41.25rem"]}
          opacity={".9"}
          backdrop-filter="blur(20px)"
          borderRadius="1rem"
          direction={"Column"}
          gap="2rem"
        >
          <Flex direction={"Column"} pt="1.5rem">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
              You Win!
            </Text>
            <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
              You guessed correct range!
            </Text>
          </Flex>
  
          <Flex gap="1rem" alignSelf={"center"} justifyContent={"center"} direction="column">
            <Flex>
            <Image width="160px" height="207.98px" src="/51.png" alt="51" />
            </Flex>
  
            <RangeSlider aria-label={["min", "max"]} colorScheme="pink" defaultValue={[10, 30]}>
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Flex>
  
          <Flex gap="1rem" w="80%" alignSelf={"center"} direction={"column"}>
            <Flex alignSelf={"center"} gap="1rem">
              <Text textAlign="center" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                Your range:
                <chakra.span fontSize="md" color="white" fontWeight={"bold"}>
                  10-65
                </chakra.span>
              </Text>
              <Image width="12.8px" height="8.8px" src={"/ri.png"} alt="right" />
            </Flex>
            <Divider alignSelf={"center"} />
            <Flex alignSelf={"center"} gap="2rem">
              <Flex direction="column">
                <Text textAlign="end" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                  Bet:
                </Text>
                <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                  1000 BNB
                </Text>
              </Flex>
              <Flex direction="column">
                <Text textAlign="start" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                  Payout:
                </Text>
                <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                  1980 BNB
                </Text>
              </Flex>
            </Flex>
  
            <Button alignSelf={"center"} background="#102542" w="10.125rem" h="3rem" color="white" borderRadius="30px">
              
              Claim your win!
            </Button>
  
            <Button alignSelf={"center"} background="rgba(187, 211, 253, 0.2)" w="8.8175rem" h="3rem" color="white" borderRadius="30px" onClick={() => setValue(1)}>
              
              Play agin!
            </Button>
          </Flex>
        </Flex>
      </Flex>
      )}


      


        {/*   {isLessThan993 ? (
          <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
        ) : null */}




     





        <LeftColumnLucky />
        <RightColumnLucky />
      </Flex>
      <Flex pt="1rem" alignItems="center" gap="1" justifyContent="center">
        <Text fontSize="lg" color={"#FFFFFF"}>
          Audited by
        </Text>
        <Image width="104.78px" height="25px" src="/certik.png" alt="certik" />
      </Flex>
    </Flex> /* mother flex for all end */
  );
}
