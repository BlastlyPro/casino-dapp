import { Flex, Divider, Text, SimpleGrid, Link, Button, Icon, Box } from "@chakra-ui/react";
import Image from "next/image";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export default function LuckyHistory({ allRounds }) {
  function openLink(_txnHash) {
    window.open(`https://testnet.bscscan.com/tx/` + _txnHash);
  }

  return (
    /* mother flex for all start  minWidth={"1416px"} */
    <Flex w="85%" h="47rem" direction={"column"} margin={"0 auto"}>
      <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"} py="2rem">
        History
      </Text>

      {/* mother flex for combined left leader board and right all bets start */}
      <Flex className="combined" direction={["column", "column", "column", "row", "row"]} w="100%" gap="2rem">
        {/* mother flex for left portion start */}
        <Flex  w={["100%", "100%", "100%", "60%", "60%"]} direction={"column"}>
          {/* flex for all bets and my bets start */}

          <Flex gap="0.5rem">
            <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
              All bets
            </Text>
          </Flex>

          {/* flex for all bets and my bets end */}

          {/* mother flex for table start*/}
          <Flex direction={"column"}>
            {/* flex for table heading start */}
            <Flex py="1rem">
              <Flex w="13.125rem">
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
                  Range
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
            </Flex>
            {/* flex for table heading end */}

            {/* flex for first table row start */}
            {allRounds && allRounds.length > 0 ? (
              <>
                {allRounds
                  .slice(-5)
                  .reverse()
                  .map((round, i) => (
                    <>
                      <Flex gap="1rem" cursor={"pointer"} marginY={".6rem"} onClick={() => openLink(round.txnHash)} h="4.5rem" bgColor={ i % 2 !== 0 ? "" : "rgba(187, 211, 253, 0.2)"} borderRadius="60px">
                        <Flex w="13.125rem" pl="1rem" gap="0.5rem" alignItems="center">
                        {/*   <Image width="40px" height="40px" src="/r1.png" alt="Row One Rank Profile" /> */}
                          <Flex direction={"column"}>
                            {/* <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                              Joanna Wozny
                            </Text> */}
                            <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                              {round.player2Address.substring(0, 4) + " ... " + round.player2Address.slice(-3)}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex w="7.375rem" alignItems="center">
                          <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                            {round.player2BetAmount} BLAST
                          </Text>
                        </Flex>

                        <Flex w="5.5rem">
                          <Flex gap="0.5rem" alignItems="center">
                          
                            <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                              {round.luckyRangeBet}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex w="10rem">
                            {round.luckyNumber}
                        </Flex>

                        <Flex w="7.5rem" alignItems="center">
                          <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                            {round.player2BetAmount} BLAST
                          </Text>
                        </Flex>
                      </Flex>
                    </>
                  ))}
              </>
            ) : (
              <Text>No results yet</Text>
            )}

            <Flex p="1rem" alignItems={"center"} justifyContent={"space-between"}>
              <Flex alignItems={"center"} justifyContent="center">
                <Icon as={BsArrowLeftShort} fontSize="xl" color="white" />
                <Link href="">
                  <Button fontSize="xs" variant="link" color={"#BBD3FD"}>
                    Previous
                  </Button>
                </Link>
              </Flex>

              <Flex alignItems={"center"} justifyContent="center">
                <Link href="">
                  <Button fontSize="xs" variant="link" color={"#BBD3FD"}>
                    Next
                  </Button>
                </Link>
                <Icon as={BsArrowRightShort} fontSize="xl" color="white" />
              </Flex>
            </Flex>
          </Flex>
          {/* mother flex for table end*/}
        </Flex>
        {/* mother flex for left portion end */}

        {/* mother flex for right portion start ---------------------------*/}
        <Flex direction={"column"}   w={["100%", "100%", "100%", "40%", "40%"]}>
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
            <Flex py="1rem">
              <Flex w="7.375rem" pl="1rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Payout
                </Text>
              </Flex>

              <Flex w="5.5rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Range
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
            </Flex>
            {/* flex for table heading end */}

            {/* flex for first table row start */}
            {allRounds && allRounds.length > 0 ? (
              <>
                {allRounds
                  .slice(-5)
                  .reverse()
                  .map((round, i) => (
                    <>
                  <Flex cursor={"pointer"} marginY={".6rem"} h="4.5rem" background={"rgba(86, 146, 250, 0.6)"} borderRadius="60px">
                    <Flex w="7.375rem" alignItems="center" pl="1rem">
                      <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                      {/* Hoga mara */}
                      {round.player2BetAmount} BLAST
                      </Text>
                    </Flex>

                    <Flex w="5.5rem">
                      <Flex gap="0.5rem" alignItems="center">
                        <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                        {round.luckyRangeBet}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex w="10rem">
                      <Flex gap="0.3rem" alignItems="center">
                        <Image width="40px" height="40" src="/11.png" alt="11" />
                        <Image width="16px" height="16px" src={"/right.png"} alt="right" />
                        <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                        {round.luckyNumber} 
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex w="7.5rem" alignItems="center">
                      <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                      {round.player2BetAmount} BLAST
                      </Text>
                    </Flex>
                  </Flex>  
                  </>
                  ))}
              </>
            ) : (
              <Text>No results yet</Text>
            )}                  
            {/* flex for first table row end */}


            
            {/* flex for second table row start */}
            {/* <Flex cursor={"pointer"} marginY={".6rem"} h="4.5rem"  borderRadius="60px">
              <Flex w="7.375rem" alignItems="center" pl="1rem">
                <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                  0 BNB
                </Text>
              </Flex>

              <Flex w="5.5rem">
                <Flex gap="0.5rem" alignItems="center">
                  <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                    80-90
                  </Text>
                </Flex>
              </Flex>

              <Flex w="10rem">
                <Flex gap="0.3rem" alignItems="center">
                  <Image width="40px" height="40" src="/49.png" alt="49" />
                  <Image width="16px" height="16px" src={"/cross.png"} alt="cross" />
                  <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                    loss
                  </Text>
                </Flex>
              </Flex>

              <Flex w="7.5rem" alignItems="center">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  100 BNB
                </Text>
              </Flex>
            </Flex> */}
            {/* flex for second table row end */}


          </Flex>
          {/* mother flex for table end*/}
        </Flex>

        {/* mother flex for right portion end */}
      </Flex>
    </Flex>
    /* mother flex for all end */
  );
}
