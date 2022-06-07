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
  import { useState,useContext,useEffect } from "react";
  import { FiShoppingCart } from "react-icons/fi";
  import { MainContext } from "../providers/MainProvider";
  import { TOKEN_CONTRACT_ADDRESS } from "../../env";

  const LeftColumnLucky = () => {
    
    const { stateData, web3Data, getContractsData } = useContext(MainContext);
    const [totalLuckyRangeRound,setTotalLuckyRangeRound]= useState(null);
    const [contractBalance, setContractBalance]= useState(null);

    useEffect(()=>{
      const init = async() => {
        const { blastlyContract } = getContractsData();
        const [web3] = web3Data;
        let allRoundsCount = await blastlyContract.methods.totalLuckyRangeRound().call();       
        setTotalLuckyRangeRound(allRoundsCount);
        let contractBalance = await blastlyContract.methods.getBalance(TOKEN_CONTRACT_ADDRESS).call();
        contractBalance = web3.utils.fromWei(contractBalance, "ether");
        setContractBalance(contractBalance);     
      }
      init();
    },[]);
    return (
      <Flex pt="1rem"  w={["100%", "100%", "100%", "50%", "50%"]}  direction={ "column"}> {/* mother flex for total bet and symbol start */}
        <Flex direction="column" w="100%">
          <Flex gap={["1rem", "1rem", "1rem", "1rem", "1rem"]} pb="2rem" alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
  
  
            <Flex alignItems={ "center"}  justifyContent={ "center"}>
             
            <Image width="23.75px" height="25px" src="/coinIcon.png" alt="coinIcon" /> </Flex>
            <Flex direction={ "column"}>
              <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> Total bets </Text>
              {totalLuckyRangeRound ?(<Text fontSize="sm" color={ "white"}> {totalLuckyRangeRound} </Text>) : "0"}
            </Flex>
          </Flex>
          <Divider w="100%" /> </Flex> {/* mother flex for total bet and symbol end */} {/* mother flex for volume and symbol start */}
        <Flex direction="column" pt="2rem" w="100%">
          <Flex gap="1rem" pb="2rem"  alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
            <Flex alignItems={ "center"} justifyContent={ "center"}>
              <Image width="27.5px" height="15px" src="/upArrow.png" alt="upArrow" /> </Flex>
            <Flex direction={ "column"}>
              <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> All time volume </Text>
              {contractBalance ? (<Text fontSize="sm" color={ "white"}> {contractBalance} BLAST </Text>) : "0"}
            </Flex>
          </Flex>
          <Divider w="100%" /> </Flex> {/* mother flex for volume and symbol end */} 
        <Flex w="100%" pt="1rem"  alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
          <Flex alignItems={ "center"} justifyContent="center" w="10.56rem" h="3rem" bgColor=" #BBD3FD" borderRadius={ "30px"} gap="2">
            <Icon as={FiShoppingCart} fontSize="xl" color="#102542" />
            <Text fontSize="sm" color={ "#102542"}> Buy BLAST Token </Text>
          </Flex>
        </Flex>
      </Flex>   
    );
  };
  
  export default LeftColumnLucky;