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

export default function CoinToss() {
  return (
    /* mother flex for all start */
    <Flex w="100%" direction={"column"}>
      <Flex
        pb="2rem"
        direction={"column"}
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize="6xl" fontWeight="bold" color={"#FFFFFF"}>
          Coin Toss
        </Text>
        <Text
          fontSize="sm"
          fontWeight="bold"
          color={"RGBA(255, 255, 255, 0.8)"}
          pb="2rem"
        >
          Try your luck and choose between 2 sides of the coin
        </Text>
      </Flex>

      <Flex w="100%" justifyContent={"center"} gap="2">
        {/* flex for left Start */}

        <Flex pt="1rem" w="20%" direction={"column"}>
          {/* mother flex for total bet and symbol start  */}

          <Flex direction="column" w="100%">
            <Flex gap="1rem" pb="2rem">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Image
                  width="23.75px"
                  height="25px"
                  src="/coinIcon.png"
                  alt="coinIcon"
                />
              </Flex>

              <Flex direction={"column"}>
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  Total bets
                </Text>

                <Text fontSize="sm" color={"FFFFFF"}>
                  270185
                </Text>
              </Flex>
            </Flex>
            <Divider w="100%" />
          </Flex>
          {/* mother flex for total bet and symbol end  */}

          {/* mother flex for volume and symbol start */}
          <Flex direction="column" pt="2rem" w="100%">
            <Flex gap="1rem" pb="2rem">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Image
                  width="27.5px"
                  height="15px"
                  src="/upArrow.png"
                  alt="upArrow"
                />
              </Flex>

              <Flex direction={"column"}>
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  All time volume
                </Text>

                <Text fontSize="sm" color={"FFFFFF"}>
                  126 464 414 BNB
                </Text>
              </Flex>
            </Flex>
            <Divider w="100%" />
          </Flex>
          {/* mother flex for volume and symbol end */}

          {/* mother flex for house edge and symbol start */}
          <Flex direction="column" pt="2rem" w="100%">
            <Flex gap="1rem" pb="2rem">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Image
                  width="25px"
                  height="24.99px"
                  src="/house.png"
                  alt="house"
                />
              </Flex>

              <Flex direction={"column"}>
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  House Edge
                </Text>

                <Text fontSize="sm" color={"FFFFFF"}>
                  1%
                </Text>
              </Flex>
            </Flex>
          </Flex>

          {/* mother flex for house edge and symbol end */}

          <Flex></Flex>

          <Flex w="100%" pt="1rem">
            <Flex
              alignItems={"center"}
              justifyContent="center"
              w="10.56rem"
              h="3rem"
              bgColor=" #BBD3FD"
              borderRadius={"30px"}
              gap="2"
            >
              <Icon as={FiShoppingCart} fontSize="xl" color="#102542" />

              <Text fontSize="sm" color={"#102542"}>
                BuyMGToken
              </Text>
            </Flex>
          </Flex>
        </Flex>

        {/* flex for midle Start */}
        <Flex
          w="40%"
          alignItems="center"
          justifyContent="center"
          direction="column"
        >
          <Flex
            bgColor={" rgba(86, 146, 250, 0.6)"}
            w="35rem"
            h="25.437rem"
            opacity={".9"}
            backdrop-filter="blur(20px)"
            borderRadius="1rem"
            direction={"Column"}
          >
            <Flex direction={"Column"} pt="1.5rem">
              <Text
                textAlign="center"
                fontSize="2xl"
                fontWeight="bold"
                color={"#FFFFFF"}
              >
                Select Your Side!
              </Text>
              <Text
                textAlign="center"
                fontSize="xl"
                color={"rgba(255, 255, 255, 0.6)"}
              >
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

              {/*    <Flex w="5rem" h="5rem" borderRadius="50%" bgColor={"#CBD5E0"}>
                {" "}
              </Flex>

              <Flex w="5rem" h="5rem" borderRadius="50%" bgColor={"#CBD5E0"}>
                {" "}
              </Flex> */}
              <Flex>
                <Image
                  width="280px"
                  height="140px"
                  src="/Coins.png"
                  alt="Coin"
                />
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

            <Flex alignSelf={"center"}>
              <Flex
                left="2.5rem"
                h="3rem"
                border="none"
                w="13.125rem"
                bgColor="white"
                fontSize="xs"
                color={"black"}
                borderRadius="30px"
              >
                <Flex
                  pl="0.3rem"
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Image
                    width="20px"
                    height="20px"
                    src="/inputFrame.png"
                    alt="inputFrame"
                  />

                  <Input
                    border="none"
                    bgColor="white"
                    fontSize="xs"
                    w="8rem"
                    color={"#102542CC"}
                    borderRadius="30px"
                    placeholder={"1000BNB"}
                  />
                </Flex>
                <Flex alignItems={"center"} justifyContent={"center"}>
                  {" "}
                  <Image
                    width="16px"
                    height="16px"
                    src="/InputArrow.png"
                    alt="InputArrow"
                  />
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
              >
                <Text> Place Your Bet!</Text>
              </Button>
            </Flex>

            <Text textAlign="center" fontSize="sm" color={"white"} p="2rem">
              Winning Payout: 1980.00BNB
            </Text>
          </Flex>
        </Flex>

        {/* flex for right Start */}
        <Flex w="20%" direction={"column"} gap="0.5rem">
          <Flex pb="1.5rem">
            <Text fontSize="md" fontWeight={"bold"} color={"#FFFFFF"}>
              {" "}
              Latest results
            </Text>
          </Flex>


          {/* mother flex for to name and symbol start 1  */}
          <Flex direction="column" w="100%">
            <Flex justifyContent={"space-between"} pb="1.5rem">
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold">
                  Joanna Wozny
                </Text>
              </Flex>

              <Flex alignItems={"center"} gap="1rem">
                <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
                  30 BNB
                </Text>
                <Image
                  width="34.28px"
                  height="34.3px"
                  src="/Tails.png"
                  alt="Tails"
                />
                <Image
                  width="16px"
                  height="11px"
                  src="/right.png"
                  alt="right"
                />
              </Flex>
            </Flex>
            <Divider w="100%" />
          </Flex>
          {/* mother flex for name and symbol end 1 */}



 {/* mother flex for to name and symbol start 2  */}
 <Flex direction="column" w="100%">
 <Flex justifyContent={"space-between"} pb="1.5rem">
   <Flex alignItems={"center"} justifyContent={"center"}>
     <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold">
       Joanna Wozny
     </Text>
   </Flex>

   <Flex alignItems={"center"} gap="1rem">
     <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
       30 BNB
     </Text>
     <Image
       width="34.28px"
       height="34.3px"
       src="/Heads.png"
       alt="Heads"
     />
     <Image
       width="12px"
       height="12px"
       src="/cross.png"
       alt="cross"
     />
   </Flex>
 </Flex>
 <Divider w="100%" />
</Flex>
{/* mother flex for name and symbol end 2  */}


 {/* mother flex for to name and symbol start 3  */}
 <Flex direction="column" w="100%">
 <Flex justifyContent={"space-between"} pb="1.5rem">
   <Flex alignItems={"center"} justifyContent={"center"}>
     <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold">
       Joanna Wozny
     </Text>
   </Flex>

   <Flex alignItems={"center"} gap="1rem">
     <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
       30 BNB
     </Text>
     <Image
       width="34.28px"
       height="34.3px"
       src="/Tails.png"
       alt="Tails"
     />
     <Image
       width="16px"
       height="11px"
       src="/right.png"
       alt="right"
     />
   </Flex>
 </Flex>
 <Divider w="100%" />
</Flex>
{/* mother flex for name and symbol end 3 */}

 {/* mother flex for to name and symbol start 4  */}
 <Flex direction="column" w="100%">
 <Flex justifyContent={"space-between"} pb="1.5rem">
   <Flex alignItems={"center"} justifyContent={"center"}>
     <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold">
       Joanna Wozny
     </Text>
   </Flex>

   <Flex alignItems={"center"} gap="1rem">
     <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
       30 BNB
     </Text>
     <Image
       width="34.28px"
       height="34.3px"
       src="/Tails.png"
       alt="Tails"
     />
     <Image
       width="16px"
       height="11px"
       src="/right.png"
       alt="right"
     />
   </Flex>
 </Flex>
 <Divider w="100%" />
</Flex>
{/* mother flex for name and symbol end 4 */}

 {/* mother flex for to name and symbol start 5  */}
 <Flex direction="column" w="100%">
 <Flex justifyContent={"space-between"} pb="1.5rem">
   <Flex alignItems={"center"} justifyContent={"center"}>
     <Text fontSize="xs" color={"#FFFFFF"} fontWeight="bold">
       Joanna Wozny
     </Text>
   </Flex>

   <Flex alignItems={"center"} gap="1rem">
     <Text fontSize="xs" color={"rgba(255, 255, 255, 0.6)"}>
       30 BNB
     </Text>
     <Image
       width="34.28px"
       height="34.3px"
       src="/Heads.png"
       alt="Heads"
     />
     <Image
       width="12px"
       height="12px"
       src="/cross.png"
       alt="cross"
     />
   </Flex>
 </Flex>
 <Divider w="100%" />
</Flex>
{/* mother flex for name and symbol end 5  */}

        </Flex>
        {/* flex for right end */}
      </Flex>

      <Flex pt="1rem" alignItems="center" gap="1" justifyContent="center">
        <Text fontSize="lg" color={"#FFFFFF"}>
          Audited by
        </Text>
        <Image width="104.78px" height="25px" src="/certik.png" alt="certik" />
      </Flex>
    </Flex>
    /* mother flex for all end */
  );
}
