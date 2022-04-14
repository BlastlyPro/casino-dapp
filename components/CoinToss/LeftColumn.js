import {
  Flex,
  Text,
  SimpleGrid,
  Link,
  Button,
  Divider,
  Icon,
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";

const LeftColumn = ({coinFlipContractData, totalRound, contractBalance, PROJECT_FEE, _coinFlip}) => {

  console.log(contractBalance);

  return (
    <Flex pt="1rem" w="20%" direction={ "column"}> {/* mother flex for total bet and symbol start */}
      <Flex direction="column" w="100%">
        <Flex gap="1rem" pb="2rem">
          <Flex alignItems={ "center"} justifyContent={ "center"}>
            <Image width="23.75px" height="25px" src="/coinIcon.png" alt="coinIcon" /> </Flex>
          <Flex direction={ "column"}>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> Total bets </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {totalRound} </Text>
          </Flex>
        </Flex>
        <Divider w="100%" /> </Flex> {/* mother flex for total bet and symbol end */} {/* mother flex for volume and symbol start */}
      <Flex direction="column" pt="2rem" w="100%">
        <Flex gap="1rem" pb="2rem">
          <Flex alignItems={ "center"} justifyContent={ "center"}>
            <Image width="27.5px" height="15px" src="/upArrow.png" alt="upArrow" /> </Flex>
          <Flex direction={ "column"}>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> All time volume </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {contractBalance} MGT </Text>
          </Flex>
        </Flex>
        <Divider w="100%" /> </Flex> {/* mother flex for volume and symbol end */} {/* mother flex for house edge and symbol start */}
      <Flex direction="column" pt="2rem" w="100%">
        <Flex gap="1rem" pb="2rem">
          <Flex alignItems={ "center"} justifyContent={ "center"}>
            <Image width="25px" height="24.99px" src="/house.png" alt="house" /> </Flex>
          <Flex direction={ "column"}>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> House Edge </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {PROJECT_FEE}% </Text>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> House Fee Collected </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {_coinFlip.houseTotalFee} MGT</Text>            
          </Flex>
        </Flex>
      </Flex> {/* mother flex for house edge and symbol end */}
      <Flex w="100%" pt="1rem">
        <Flex alignItems={ "center"} justifyContent="center" w="10.56rem" h="3rem" bgColor=" #BBD3FD" borderRadius={ "30px"} gap="2">
          <Icon as={FiShoppingCart} fontSize="xl" color="#102542" />
          <Text fontSize="sm" color={ "#102542"}> BuyMGToken </Text>
        </Flex>
      </Flex>
    </Flex>   
  );
};

export default LeftColumn;
