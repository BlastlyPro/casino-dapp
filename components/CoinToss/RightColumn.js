import { Flex, Text, Button, Divider, Input } from "@chakra-ui/react";
import Image from "next/image";
import { useState,useContext,useEffect } from "react";
import { TOKEN_CONTRACT_ADDRESS } from "../../env";
import { MainContext } from "../providers/MainProvider";

const RightColumn = ({allRounds}) => {

  const { stateData, web3Data, getContractsData } = useContext(MainContext);
  const [state] = stateData;
  const [myBets, setMyBets]= useState(null);
  const {supabase}=getContractsData();

  useEffect(()=>{

    const init = async()=>{
      let data=await supabase.from('coinFlip').select().eq("player2Address",state.account);
       setMyBets(data.data);
    }
    init();
  },[]);

  function openLink(_txnHash) {
    window.open(`https://testnet.bscscan.com/tx/` + _txnHash);
  }

  return (
    <Flex  w={["100%", "100%", "100%", "50%", "50%"]} direction={"column"} gap="0.5rem">
      <Flex pb="1.5rem">
        <Text fontSize="md" fontWeight={"bold"} color={"#FFFFFF"}>
          Latest results
        </Text>
      </Flex>

      <Flex direction="column" w="100%">
        {allRounds && allRounds.length > 0 ? (
          <>
            {allRounds
              .slice(-5)
              .reverse()
              .map((round, i) => (
                <>
                  <Flex _hover={{ transform: "scale(1.1)", cursor: "pointer" }} transition={"all .3s"} onClick={() => openLink(round.txn)} justifyContent={"space-between"} alignItems={"center"} py={"1rem"} key={i}>
                    <Flex alignItems={"center"} justifyContent={"center"}>
                      <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold" textDecoration={"underline"}>
                        {round.player2Address.substring(0, 4) + " ... " + round.player2Address.slice(-3)}
                      </Text>
                    </Flex>

                    <Flex alignItems={"center"} gap="1rem">
                      <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                        {round.player2BetAmount} BLAST
                      </Text>
                      <Image width="34px" height="34px" src={round.player2BetChoice === "Heads" ? "/Heads.png" : "/Tails.png"} alt="Tails" />
                      <Image width="16px" height="16px" src={round.player2BetChoice !== round.winningPosition ? "/cross.png" : "/right.png"} alt="right" />
                    </Flex>
                  </Flex>
                  <Divider w="100%" />
                </>
              ))}
          </>
        ) : (
          <Text>No results yet</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default RightColumn;
