import { useState } from "react";
import { Flex, Text, Button, Divider, Input, Box , useMediaQuery} from "@chakra-ui/react";
import Image from "next/image";
import LeftColumn from "./LeftColumn";
import RightColumn from "./RightColumn";
import Swal from "sweetalert2";

export default function CoinToss({ coinFlipContractData, handleChange, coinFlip, allRounds, totalRound, contractBalance, PROJECT_FEE, _coinFlip }) {
  const [choice, setChoice] = useState(null);
  const [value, setValue] = useState(1);

  const callCoinFlip = (selectedChoice) => {
    if (selectedChoice == null || selectedChoice == undefined) {
      Swal.fire({
        title: "Please select a side!",
        icon: "error",
      });
      return;
    }
    
    coinFlip(selectedChoice);

    setValue(2);
  };

  
 /*  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)"); */

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
      <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
      
     {/*  {isLargerThan993 ? (
        <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
      ) : null} */}

    
      {value == 1 && (
        <Flex w={["100%", "100%", "100%", "50%", "50%"]}  alignItems="center" justifyContent="center" direction="column">
        <Flex bgColor={"rgba(86, 146, 250, 0.6)"}  w={["100%", "100%", "100%", "94%", "94%"]} h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"}>
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
                <Input border="none" bgColor="white" fontSize="xs" w="8rem" color={"#102542CC"} borderRadius="30px" placeholder={"1000BLAST"} onChange={(e) => handleChange(e)} />
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
      )}



      {value == 2 && (
        <Flex w={["100%", "100%", "100%", "50%", "50%"]}  alignItems="center" justifyContent="center" direction="column">
        <Flex bgColor={"rgba(86, 146, 250, 0.6)"}  w={["100%", "100%", "100%", "94%", "94%"]} h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"} gap="1.5rem">
          <Flex direction={"Column"} pt="1.5rem">
            <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
              
            You Win!
            </Text>
            <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
              
            Tails brings you a victory. Good job!
            </Text>
          </Flex>
      
          <Flex alignItems={"center"} justifyContent="center" gap="1rem">
          <Flex direction="column">
            <Text textAlign="end" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
              Bet:
            </Text>
            <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
              1000 BNB
            </Text>
          </Flex>
  
          <Flex>
                  <Image width="160px" height="160px" src="/Tails.png" alt="Tails" />
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
          
        <Flex justifyContent={"center"} gap="1rem">
        <Button background="#102542" w="10.125rem" h="3rem" color="white" borderRadius="30px">
        
        Claim your win!
      </Button>
  
      <Button background="rgba(187, 211, 253, 0.2)"  w="8.1875rem" h="3rem" color="white" borderRadius="30px"     onClick={() => setValue(1)}>
        
        Play agin!
      </Button>
        </Flex>
        
        </Flex>
      </Flex>
      )}
  
      {/*   {isLessThan993 ? (
          <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
        ) : null */}
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
