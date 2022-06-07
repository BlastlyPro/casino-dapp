import { Flex, Divider, Text, SimpleGrid, Link, Button, Icon, Box } from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import { MainContext } from "./providers/MainProvider";

export default function History() {

  const { stateData, web3Data, getContractsData } = useContext(MainContext);
  const [state] = stateData;
  const [allRounds, setAllRounds]= useState(null);
  const [myBets, setMyBets]= useState(null);
  

  useEffect(()=>{

    const init = async()=>{      
      const {supabase}=getContractsData();
      let { data, error } = await supabase.from('coinFlip').select();
      setAllRounds(data);
      data=await supabase.from('coinFlip').select().eq("player2Address",state.account);
       setMyBets(data.data);
    }
    init();
  },[]);

  function openLink(_txnHash) {
    window.open(`https://testnet.bscscan.com/tx/` + _txnHash);
  }

  return (
    /* mother flex for all start  minWidth={"1416px"} */
    <Flex w="85%" direction={"column"} margin={"0 auto"}>
      <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"} py="2rem">
        History
      </Text>

      {/* mother flex for combined left leader board and right all bets start */}
      <Flex w="100%" gap="2rem" direction={["column", "column", "column", "row", "row"]}>
        {/* mother flex for left portion start */}
        <Flex gap={5}>
          {/* flex for all bets and my bets start */}
          <Flex direction={"column"}>
            <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
              All bets
            </Text>

            <Flex direction={"column"}>
              <Flex py="1rem" gap="1rem">
                <Flex w="13.125rem" pl="1rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    Name
                  </Text>
                </Flex>

                <Flex w="7.375rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    Payout
                  </Text>
                </Flex>

                <Flex w="5.5rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    Picked side
                  </Text>
                </Flex>

                <Flex w="10rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    Result
                  </Text>
                </Flex>

                <Flex w="7.5rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    Bet
                  </Text>
                </Flex>

                <Flex w="7.5rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Txn Hash
                </Text>
              </Flex>  

              </Flex>
              {allRounds && allRounds.length > 0 ? (
                <>
                  {allRounds
                    .slice(-5)
                    .reverse()
                    .map((round, i) => (
                      <>
                        <Flex gap="1rem" cursor={"pointer"} marginY={".6rem"} onClick={() => openLink(round.txn)} h="4.5rem" bgColor={i % 2 !== 0 ? "" : "rgba(187, 211, 253, 0.2)"} borderRadius="60px">
                          <Flex w="13.125rem" pl="1rem" gap="0.5rem" alignItems="center">
                            {/*   <Image width="40px" height="40px" src="/r1.png" alt="Row One Rank Profile" /> */}
                            <Flex direction={"column"}>
                              <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                                {round.player2Address.substring(0, 4) + " ... " + round.player2Address.slice(-3)}
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex w="7.375rem" alignItems="center">
                            <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                              {round.player2BetChoice == round.winningPosition ? "2x"  : "0"}
                              
                            </Text>
                          </Flex>

                          <Flex w="5.5rem">
                            <Flex gap="0.5rem" alignItems="center">
                              <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                                {round.player2BetChoice == true ? "Heads" : "Tails"}
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex w="10rem">
                            <Flex gap="0.3rem" alignItems="center">
                              <Image width="34.28px" height="34.3px" src={round.player2BetChoice === "Heads" ? "/Heads.png" : "/Tails.png"} alt={round.player2BetChoice === "Heads" ? "Heads" : "Tails"} />
                              <Image width="16px" height="16px" src={round.player2BetChoice !== round.winningPosition ? "/cross.png" : "/right.png"} alt="right" />
                              <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                                {round.player2BetChoice !== round.winningPosition ? "Loss" : "Win"}
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex w="7.5rem" alignItems="center">
                            <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                              {round.player2BetAmount} BLAST
                            </Text>
                          </Flex>

                          <Flex w="7.5rem" alignItems="center">
                          <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                          {round.txn.substring(0,3)+ '...' + round.txn.slice(-3)}
                          </Text>
                        </Flex>   

                        </Flex>
                      </>
                    ))}
                </>
              ) : (
                <Text>No results yet</Text>
              )}
            </Flex>
          </Flex>

          <Flex>
            {/* mother flex for right portion start */}
            <Flex direction={"column"}>
              {/* flex for all bets and my bets start */}

              <Flex gap="0.5rem" pl="1rem">
                <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
                  My bets
                </Text>
              </Flex>

              {/* flex for all bets and my bets end */}

              {/* mother flex for table start*/}

              <Flex direction={"column"}>
                {/* flex for table heading start */}
                <Flex py="1rem" pl="7" gap={10}>
                  <Flex>
                    <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                      Payout
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                      Picked Side
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                      Result
                    </Text>
                  </Flex>

                  <Flex>
                    <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                      Bet
                    </Text>
                  </Flex>

                <Flex w="7.5rem">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    txnHash
                  </Text>
                </Flex>                    
                </Flex>
                {/* flex for table heading end */}

                {/* flex for first table row start */}

                {myBets && myBets.length > 0 ? (
                  <>
                    {myBets
                      .slice(-5)
                      .reverse()
                      .map((round, i) => (
                        <>
                          <Flex gap={10} pr={"4"} cursor={"pointer"} marginY={".6rem"} h="4.5rem" onClick={() => openLink(round.txn)} bgColor={i % 2 !== 0 ? "" : "rgba(86, 146, 250, 0.6)"} borderRadius="60px">
                            <Flex alignItems="center" pl="1rem">
                              <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                                {round.player2BetAmount} Blast
                              </Text>
                            </Flex>

                            <Flex>
                              <Flex gap="0.5rem" alignItems="center">
                                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                                {round.player2BetChoice == true ? "Heads" : "Tails"}
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex>
                              <Flex gap="0.3rem" alignItems="center">
                                <Image width="34.28px" height="34.3px" src={round.player2BetChoice === "Heads" ? "/Heads.png" : "/Tails.png"} alt={round.player2BetChoice === "Heads" ? "Heads" : "Tails"} />
                                <Image width="16px" height="16px" src={round.player2BetChoice !== round.winningPosition ? "/cross.png" : "/right.png"} alt="right" />
                                <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                                  {round.player2BetChoice !== round.winningPosition ? "Loss" : "Win"}
                                </Text>
                              </Flex>
                            </Flex>

                            <Flex alignItems="center">
                              <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                                {round.player2BetAmount} BNB
                              </Text>
                            </Flex>

                            <Flex w="7.5rem" alignItems="center">
                              <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                              {round.txn.substring(0,3)+ '...' + round.txn.slice(-3)} 
                              </Text>
                            </Flex>                             
                          </Flex>
                          {/* flex for first table row end */}
                        </>
                      ))}
                  </>
                ) : (
                  <Text>No results yet</Text>
                )}
              </Flex>
              {/* mother flex for table end*/}
            </Flex>
            {/* mother flex for right portion end */}
          </Flex>
        </Flex>

        {/* mother flex for combined left leader board and right all bets end */}
      </Flex>
    </Flex>
    /* mother flex for all end */
  );
}
