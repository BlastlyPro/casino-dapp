import { useState } from "react";
import { Flex, Text, Button, Divider, Input, Box , useMediaQuery} from "@chakra-ui/react";
import Image from "next/image";

import Swal from "sweetalert2";
import RightColumnLucky from "./RightColumnLucky";
import LeftColumnLucky from "./LeftColumnLucky";

export default function Lucky({ coinFlipContractData, handleChange, coinFlip, allRounds, totalRound, contractBalance, PROJECT_FEE, _coinFlip }) {
  const [choice, setChoice] = useState(null);

  const callCoinFlip = (selectedChoice) => {
    if (selectedChoice == null || selectedChoice == undefined) {
      Swal.fire({
        title: "Please select a side!",
        icon: "error",
      });
      return;
    }
    coinFlip(selectedChoice);
  };

  
 /*  const [isLargerThan993] = useMediaQuery("(min-width: 993px)");
  const [isLessThan993] = useMediaQuery("(max-width: 993px)"); */

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
      <LeftColumnLucky coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
      
     {/*  {isLargerThan993 ? (
        <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
      ) : null} */}
        <Flex w={["100%", "100%", "100%", "50%", "50%"]}  alignItems="center" justifyContent="center" direction="column">
          <Flex bgColor={"rgba(86, 146, 250, 0.6)"}  w={["100%", "100%", "100%", "94%", "94%"]} h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"} gap="1rem">
            <Flex direction={"Column"} pt="1.5rem">
              <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
                
              Choose Your Spectrum!
              </Text>
              <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
                
              Guess your range & win accordingly
              </Text>
            </Flex>
           <Flex w="94%"  direction={"column"} alignSelf="center">

           <Flex  alignSelf="center" gap="3rem" >
           <Image width="90px" height="116.99px" src="/ten.svg" alt="ten" />
           <Image width="90px" height="116.99px" src="/sixtyfive.svg" alt="sixtyfive" />
           </Flex>
         
           <Flex w="80%" alignSelf="center" alignItems={"center"} justifyContent="center"   h="1rem" background="#FFFFFF" borderRadius={"20px"}>
          
           <Flex w="0.625rem" h="0.625rem" borderRadius={"50%"} background={"#102542"}></Flex>
           <Flex w="40%" h="0.625rem" bgGradient={"linear-gradient(270deg, #FBBF2D 2.05%, #78D6BE 99.07%)"}></Flex>
           <Flex w="0.625rem" h="0.625rem" borderRadius={"50%"} background={"#102542"}></Flex>
           
           
           
           </Flex>
           
           
           </Flex>
            <Flex alignSelf={"center"} direction={["column", "column", "row", "row", "row"]}>
              <Flex h="3rem" border="none" w="13.125rem" bgColor="white" fontSize="xs" color={"black"} borderRadius="30px" marginLeft={"2.5rem"}>
                <Flex pl="0.3rem" alignItems={"center"} justifyContent={"center"}>
                  <Image width="20px" height="20px" src="/inputFrame.png" alt="inputFrame" />
                  <Input border="none" bgColor="white" fontSize="xs" w="8rem" color={"#102542CC"} borderRadius="30px" placeholder={"1000 BNB"} onChange={(e) => handleChange(e)} />
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
            <Flex justifyContent={"space-between"} px="2rem" py="1rem">
            <Text textAlign="center" fontSize="xs" color={"white"}>
              
            Your odds: 2.317x
          </Text>
           
          <Text textAlign="center" fontSize="xs" color={"white"} >
              
          Winning Payout: 1980.00 BNB
          </Text>
            </Flex>
           
          </Flex>
        </Flex>
      {/*   {isLessThan993 ? (
          <LeftColumn coinFlipContractData={coinFlipContractData} totalRound={totalRound} contractBalance={contractBalance} PROJECT_FEE={PROJECT_FEE} _coinFlip={_coinFlip} />
        ) : null */}
        <RightColumnLucky allRounds={allRounds} />
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
