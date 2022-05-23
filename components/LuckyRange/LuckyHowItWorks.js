import { Flex, Text, SimpleGrid, Link, Button, Icon, Box } from "@chakra-ui/react";
import Image from "next/image";

import { FiShoppingCart } from "react-icons/fi";
import { BsArrowRepeat, BsEmojiSmile } from "react-icons/bs";
import { AiOutlineArrowsAlt } from "react-icons/ai";

export default function LuckyHowItWorks() {
  return (
    /* mother flex for all start  minWidth={"988px"} */
    <Flex  height={"40rem"} alignItems={"center"} justifyContent={"center"} backgroundImage={'url("/luckyhowitworks.png")'} backgroundRepeat={"no-repeat"} backgroundSize={"cover"}>
      {/* mother flex for left potion start */}
      <Flex w={"85%"}>
        <Flex w="80%" direction={"column"} gap="2rem">
          <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
            How It Works?
          </Text>

          {/* mother flex for MGtoken start */}
          <Flex w="100%" gap="1rem">
            <Flex w="3rem" h="3rem" bgColor="#BBD3FD" borderRadius={"50%"} justifyContent="center" alignItems={"center"}>
              <Icon as={FiShoppingCart} fontSize="xl" color="black" />
            </Flex>

            <Flex w="90%" direction={"column"}>
              <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
                Buy BLASToken
              </Text>
              <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                You need to exchange your tokens to BLASToken so you will be able to place your bet
              </Text>
            </Flex>
          </Flex>
          {/* mother flex for MGtoken end*/}

          {/* mother flex for Choose start */}
          <Flex w="100%" gap="1rem">
            <Flex w="3rem" h="3rem" bgColor="#BBD3FD" borderRadius={"50%"} justifyContent="center" alignItems={"center"}>
              <Icon as={AiOutlineArrowsAlt} fontSize="xl" color="black" />
            </Flex>

            <Flex w="90%" direction={"column"}>
              <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
                Choose Your Range
              </Text>
              <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
              Guess the range in which the drawn lucky number will fall. You win if it lands on the range you chose. Odds of your bet are depending of the volume
              </Text>
            </Flex>
          </Flex>
          {/* mother flex for Choose end*/}

          {/* mother flex for Pick start */}
          <Flex w="100%" gap="1rem">
            <Flex w="3rem" h="3rem" bgColor="#BBD3FD" borderRadius={"50%"} justifyContent="center" alignItems={"center"}>
              <Image width="20px" height="16.36px" src="/bet.png" alt="bet" />
            </Flex>

            <Flex w="90%" direction={"column"}>
              <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
                Pick the value of your bet
              </Text>
              <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                It only depends on you how much you&apos;re willing to bet on your luck
              </Text>
            </Flex>
          </Flex>
          {/* mother flex for Pick end*/}

          {/* mother flex for Enjoy start */}
          <Flex w="100%" gap="1rem">
            <Flex w="3rem" h="3rem" bgColor="#BBD3FD" borderRadius={"50%"} justifyContent="center" alignItems={"center"}>
              <Icon as={BsEmojiSmile} fontSize="xl" color="black" />
            </Flex>

            <Flex w="90%" direction={"column"}>
              <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
                Enjoy!
              </Text>
            </Flex>
          </Flex>
          {/* mother flex for Enjoy end*/}
        </Flex>
      </Flex>
      {/* mother flex for left potion end */}
    </Flex>
    /* mother flex for all end */
  );
}
