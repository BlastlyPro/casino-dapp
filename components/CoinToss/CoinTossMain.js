import { useState, useContext } from "react";
import { Flex, Text, Button, Divider, Input, Box, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Swal from "sweetalert2";
import { MainContext } from "../providers/MainProvider";

export default function CoinTossMain({ coinFlipContractData, coinFlip, allRounds, allRoundsCount, contractBalance, PROJECT_FEE, _coinFlip }) {
  const { stateData } = useContext(MainContext);
  const [state] = stateData;
  const [choice, setChoice] = useState(null);
  const [betAmount, setBetAmount] = useState(0);

  function handleBetAmount(e) {
    setBetAmount(e.target.value);
  }

  const callCoinFlip = (selectedChoice) => {
    // check if the user is connected
    if (!state.account) {
      Swal.fire({
        title: "Please connect your wallet to play",
        icon: "warning",
      });
      return;
    }

    // check seletecd choice
    if (selectedChoice == null || selectedChoice == undefined) {
      Swal.fire({
        title: "Please select a side!",
        icon: "error",
      });
      return;
    }

    // check bet amount
    if (betAmount < 10) {
      Swal.fire({
        title: "Please enter a bet amount atleast 10!",
        icon: "error",
      });
      return;
    }

    coinFlip(selectedChoice, betAmount);
  };

  return (
    /* mother flex for all start */
    <Flex w="85%" direction={"column"}>
      <Flex pb="2rem" direction={"column"} alignItems="center" justifyContent="center">
        <Text fontSize="6xl" fontWeight="bold" color={"#FFFFFF"}>
          Coin Toss
        </Text>
        <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.8)"} pb="2rem">
          Try your luck and choose between 2 sides of the coin
        </Text>
      </Flex>
      <Flex w="100%" gap="2" direction={["column", "column", "column", "row", "row"]}>
        <LeftColumn coinFlipContractData={coinFlipContractData} allRoundsCount={allRoundsCount} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
        <Flex w={["100%", "100%", "100%", "50%", "50%"]} alignItems="center" justifyContent="center" direction="column">
          <Flex bgColor={"rgba(86, 146, 250, 0.6)"} w={["100%", "100%", "100%", "94%", "94%"]} h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"}>
            <Flex direction={"Column"} pt="1.5rem">
              <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
                Select Your Side!
              </Text>
              <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
                Guess Correctly & double your money
              </Text>
            </Flex>
            <Flex alignItems="center" justifyContent="center" p="2rem">
              <Flex direction="column">
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Heads
                </Text>
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  Win Rate:
                  <br /> 49,56%
                </Text>
              </Flex>
              <Flex gap={5} marginX={3}>
                <Box _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }} transition={"all .5s"} onClick={() => setChoice(true)} transform={choice === true ? "scale(1.1)" : "scale(1)"}>
                  <Image width="120px" height="120px" src="/Heads.png" alt="Coin" />
                </Box>
                <Box _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }} transition={"all .5s"} onClick={() => setChoice(false)} transform={choice === false ? "scale(1.1)" : "scale(1)"}>
                  <Image width="120px" height="120px" src="/Tails.png" alt="Coin" />
                </Box>
              </Flex>
              <Flex direction="column">
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Tails
                </Text>
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  Win Rate:
                  <br /> 50,44%
                </Text>
              </Flex>
            </Flex>
            <Flex alignSelf={"center"} direction={["column", "column", "row", "row", "row"]}>
              <Flex h="3rem" border="none" w="13.125rem" bgColor="white" fontSize="xs" color={"black"} borderRadius="30px" marginLeft={"2.5rem"}>
                <Flex pl="0.3rem" alignItems={"center"} justifyContent={"center"}>
                  <Image width="20px" height="20px" src="/inputFrame.png" alt="inputFrame" />
                  <Input border="none" bgColor="white" fontSize="xs" w="8rem" color={"#102542CC"} borderRadius="30px" placeholder={"10 BLAST"} onChange={(e) => handleBetAmount(e)} />
                </Flex>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Image width="16px" height="16px" src="/InputArrow.png" alt="InputArrow" />
                </Flex>
              </Flex>
              <Button
                left="-2.5rem"
                alignItems="center"
                justifyContent={"center"}
                borderRadius="40px"
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
                onClick={() => callCoinFlip(choice)}
              >
                <Text _hover={{ transform: "scale(1.2)" }} transition={"all .5s"}>
                  Place Your Bet!
                </Text>
              </Button>
            </Flex>
            <Text textAlign="center" fontSize="sm" color={"white"} p="2rem">
              Winning Payout: 2x
            </Text>
          </Flex>
        </Flex>
        <RightColumn allRounds={allRounds} />
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
