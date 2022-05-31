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
import { MainContext } from "../providers/MainProvider";
import { useState,useContext,useEffect } from "react";
import { TOKEN_CONTRACT_ADDRESS } from "../../env";


const LeftColumn = () => {

    const { stateData, web3Data, getContractsData } = useContext(MainContext);
    const [totalRound,setTotalRound]= useState(null);
    const [contractBalance, setContractBalance]= useState(null);
    const [PROJECT_FEE, setPROJECT_FEE]= useState(null);
    const [houseTotalFee, setHouseTotalFee]= useState(null);

    useEffect(()=>{
      const init = async() => {
        const { blastlyContract } = getContractsData();
        const [web3] = web3Data;
        let allRoundsCount = await blastlyContract.methods.totalRound().call();       
        setTotalRound(allRoundsCount);
        let contractBalance = await blastlyContract.methods.getBalance(TOKEN_CONTRACT_ADDRESS).call();
        contractBalance = web3.utils.fromWei(contractBalance, "ether");
        setContractBalance(contractBalance);
        let projectFee = await blastlyContract.methods.PROJECT_FEE().call();
        projectFee = (projectFee / 1000) * 100
        setPROJECT_FEE(projectFee);
        let _houseTotalFee = await blastlyContract.methods.houseTotalFee().call();
        _houseTotalFee = web3.utils.fromWei(_houseTotalFee, "ether");
        setHouseTotalFee(_houseTotalFee);
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
            <Text fontSize="sm" color={ "FFFFFF"}> {totalRound} </Text>
          </Flex>
        </Flex>
        <Divider w="100%" /> </Flex> {/* mother flex for total bet and symbol end */} {/* mother flex for volume and symbol start */}
      <Flex direction="column" pt="2rem" w="100%">
        <Flex gap="1rem" pb="2rem"  alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
          <Flex alignItems={ "center"} justifyContent={ "center"}>
            <Image width="27.5px" height="15px" src="/upArrow.png" alt="upArrow" /> </Flex>
          <Flex direction={ "column"}>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> All time volume </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {contractBalance} BLAST </Text>
          </Flex>
        </Flex>
        <Divider w="100%" /> </Flex> {/* mother flex for volume and symbol end */} {/* mother flex for house edge and symbol start */}
      <Flex direction="column" pt="2rem" w="100%">
        <Flex gap="1rem" pb="2rem"  alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
          <Flex alignItems={ "center"} justifyContent={ "center"}>
            <Image width="25px" height="24.99px" src="/house.png" alt="house" /> </Flex>
          <Flex direction={ "column"}>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> House Edge </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {PROJECT_FEE}% </Text>
            <Text fontSize="xs" color={ "rgba(255, 255, 255, 0.6)"}> House Fee Collected </Text>
            <Text fontSize="sm" color={ "FFFFFF"}> {houseTotalFee} BLAST</Text>            
          </Flex>
        </Flex>
      </Flex> {/* mother flex for house edge and symbol end */}
      <Flex w="100%" pt="1rem"  alignItems={["center", "center", "center", "start", "start"]} justifyContent={["center", "center", "center", "start", "start"]}>
        <Flex alignItems={ "center"} justifyContent="center" w="10.56rem" h="3rem" bgColor=" #BBD3FD" borderRadius={ "30px"} gap="2">
          <Icon as={FiShoppingCart} fontSize="xl" color="#102542" />
          <Text fontSize="sm" color={ "#102542"}> Buy BLAST Token </Text>
        </Flex>
      </Flex>
    </Flex>   
  );
};

export default LeftColumn;