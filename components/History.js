import { Flex, Divider, Text, SimpleGrid, Link, Button, Icon, Box } from "@chakra-ui/react";
import Image from "next/image";

import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";

export default function HowItWorks({ allRounds }) {

  function openLink(_txnHash) {
    window.open(`https://testnet.bscscan.com/tx/` + _txnHash);
  }

  return (
    /* mother flex for all start */
    <Flex w="85%" direction={"column"} margin={"0 auto"}>
      <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"} py="2rem">
        History
      </Text>
      
      {/* mother flex for combined left leader board and right all bets start */}
      <Flex w="100%">
        {/* mother flex for left portion start */}
        <Flex w="40%" direction={"column"}>
          <Text pb="1rem" fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
            Leaderboard
          </Text>
          {/* flex for leader board start */}
          <Flex w="30.5rem" h="33.1875rem" direction="column" bgColor="rgba(86, 146, 250, 0.6)" borderRadius={"30px"}>
            {/* flex for top 3 start */}
            <Flex w="100%" alignSelf={"center"} pt="2rem" px="0.5rem">
              <Flex w="30%" alignItems={"center"} direction="column" justifyContent="center" pt="7rem">
                <Image width="44px" height="44px" src="/star2.png" alt="star2" />
                <Image width="100px" height="100px" src="/a2.png" alt="Second Rank Profile" />
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Mark Mitter
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Payout: 999 000 BNB
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Wins: 121
                </Text>
              </Flex>

              <Flex alignItems={"center"} direction="column" justifyContent="center" w="40%">
                <Image width="72px" height="72px" src="/star1.png" alt="star1" />
                <Image width="140px" height="140px" src="/a1.png" alt="First Rank Profile" />
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Joanna Wozny
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Payout: 1 000 000 BNB
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Wins: 999
                </Text>
              </Flex>

              <Flex w="30%" alignItems={"center"} direction="column" justifyContent="center" pt="7rem">
                <Image width="44px" height="44px" src="/star3.png" alt="star3" />
                <Image width="100px" height="100px" src="/a3.png" alt="Third Rank Profile" />
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Joan Telly...
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Payout: 998 000 BNB
                </Text>
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Wins: 511
                </Text>
              </Flex>
            </Flex>
            {/* flex for top 3 end */}

            <Divider pt="1rem" w="82%" alignSelf={"center"} />

            <Flex w="100%" px="2.5rem" pt="1rem">
              <Flex w="40%" alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  4
                </Text>
                <Image width="40px" height="40px" src="/a4.png" alt="Fourth Rank Profile" />

                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Dean Hender
                </Text>
              </Flex>
              <Flex w="30%" alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  997 000 BNB
                </Text>
              </Flex>
              <Flex w="30%" alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Wins: 878
                </Text>
              </Flex>
            </Flex>

            <Divider pt="1rem" w="82%" alignSelf={"center"} />

            <Flex w="100%" px="2.5rem" pt="1rem">
              <Flex w="40%" alignItems={"center"} justifyContent={"space-between"}>
                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  5
                </Text>
                <Image width="40px" height="40px" src="/a5.png" alt="Fifth Rank Profile" />

                <Text fontSize="sm" fontWeight="bold" color={"#FFFFFF"}>
                  Tommy Xavi
                </Text>
              </Flex>
              <Flex w="30%" alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  996 000 BNB
                </Text>
              </Flex>
              <Flex w="30%" alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="sm" fontWeight="bold" color={"rgba(255, 255, 255, 0.6)"}>
                  Wins: 21
                </Text>
              </Flex>
            </Flex>
          </Flex>
          {/* flex for  leader board end */}
        </Flex>
        {/* mother flex for left portion end */}

        {/* mother flex for right portion start */}
        <Flex w="60%" paddingLeft={"1.5rem"} direction={"column"}>
          {/* flex for all bets and my bets start */}

          <Flex gap="0.5rem">
            <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
              All bets
            </Text>
            <Text fontSize="md" fontWeight="bold" color={"rgba(187, 211, 253, 0.2)"}>
              |
            </Text>
            <Text fontSize="md" fontWeight="bold" color={"rgba(187, 211, 253, 0.2)"}>
              My bets
            </Text>
          </Flex>

          {/* flex for all bets and my bets end */}

          {/* mother flex for table start*/}
          <Flex direction={"column"}>
            {/* flex for table heading start */}
            <Flex py="1rem">
              <Flex w="13.125rem" pl="1rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Name
                </Text>
              </Flex>

              <Flex w="7.4375rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Payout
                </Text>
              </Flex>

              <Flex w="8.875rem">
                <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                  Picked side
                </Text>
              </Flex>

              <Flex w="6.5rem">
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
                      <Flex cursor={"pointer"} marginY={".6rem"} onClick={() => openLink(round.txnHash)} h="4.5rem" bgColor={ i % 2 !== 0 ? "" : "rgba(187, 211, 253, 0.2)"} borderRadius="60px">
                        <Flex w="13.125rem" pl="1rem" gap="0.5rem" alignItems="center">
                          <Image width="40px" height="40px" src="/r1.png" alt="Row One Rank Profile" />
                          <Flex direction={"column"}>
                            {/* <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                              Joanna Wozny
                            </Text> */}
                            <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                              {round.player2Address.substring(0, 4) + " ... " + round.player2Address.slice(-3)}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex w="7.4375rem" alignItems="center">
                          <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                            {round.player2BetAmount} MGT
                          </Text>
                        </Flex>

                        <Flex w="8.875rem">
                          <Flex gap="0.5rem" alignItems="center">
                            <Image width="34.28px" height="34.3px" src={round.player2BetChoice === "Heads" ? "/Heads.png" : "/Tails.png"} alt={round.player2BetChoice === "Heads" ? "Heads" : "Tails"} />
                            <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                              {round.player2BetChoice}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex w="6.5rem">
                          <Flex gap="0.3rem" alignItems="center">
                            <Image width="16px" height="16px" src={round.player2BetChoice !== round.winningPosition ? "/cross.png" : "/right.png"} alt="right" />
                            <Text fontSize="xs" fontWeight="bold" color={"#FFFFFF"}>
                              {round.player2BetChoice !== round.winningPosition ? "Loss" : "Win"}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex w="7.5rem" alignItems="center">
                          <Text fontSize="xs" fontWeight="bold" color={"rgba(255, 255, 255, 0.2)"}>
                            {round.player2BetAmount} MGT
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
          {/* mother flex for table end*/}

          <Flex p="1rem" w="43.125rem" alignItems={"center"} justifyContent={"space-between"}>
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
        {/* mother flex for right portion end */}
      </Flex>

      {/* mother flex for combined left leader board and right all bets end */}
    </Flex>
    /* mother flex for all end */
  );
}
