import {
  Flex,

  Text,
  SimpleGrid,
  Link,
  Button,
  Icon,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";

import { FiShoppingCart } from "react-icons/fi";
import { BsArrowRepeat, BsEmojiSmile } from "react-icons/bs";
import { AiFillLinkedin } from "react-icons/ai";

export default function HowItWorks() {
  return (
    /* mother flex for all start */
    <Flex
      w="100%"

      alignItems={"center"}
      h="100vh"

      backgroundImage={'url("/how.png")'}
      backgroundRepeat={"no-repeat"}
      backgroundSize={"cover"}

    >
      {/* mother flex for left potion start */}

      <Flex  w="60%"  direction={"column"} gap="2rem" pl="7rem">
        <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"} p="1rem">
          How It Works?
        </Text>

        {/* mother flex for MGtoken start */}
        <Flex w="100%" gap="1rem" pl="1rem">
          <Flex
          w="3rem"
       h="3rem"
            bgColor="#BBD3FD"
            borderRadius={"50%"}
            justifyContent="center"
            alignItems={"center"}
          >
            {" "}
            <Icon  as={FiShoppingCart} fontSize="xl" color="black" />{" "}
          </Flex>

          <Flex w="90%" direction={"column"}>
            <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}>
              {" "}
              Buy MGToken{" "}
            </Text>
            <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
              {" "}
              You need to exchange your tokens to MGToken so you will be able to
           place your bet{" "}
            </Text>
          </Flex>
        </Flex>
 {/* mother flex for MGtoken end*/}

  {/* mother flex for Choose start */}
  <Flex w="100%" gap="1rem" pl="1rem">
  <Flex
  w="3rem"
  h="3rem"
    bgColor="#BBD3FD"
    borderRadius={"50%"}
    justifyContent="center"
    alignItems={"center"}
  >
    {" "}
    <Icon as={BsArrowRepeat} fontSize="xl" color="black" />{" "}
  </Flex>

  <Flex w="90%" direction={"column"}>
    <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}> Choose Your Side
    </Text>
    <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>Make a pic between Tails and Heads. Which one would be a lucky guess for you?
    </Text>
  </Flex>
</Flex>
{/* mother flex for Choose end*/}



  {/* mother flex for Pick start */}
  <Flex w="100%" gap="1rem" pl="1rem">
  <Flex
  w="3rem"
  h="3rem"
    bgColor="#BBD3FD"
    borderRadius={"50%"}
    justifyContent="center"
    alignItems={"center"}
  >
    {" "}
    <Image
    width="20px"
    height="16.36px"
    src="/bet.png"
    alt="bet"
  />
    
  </Flex>

  <Flex w="90%" direction={"column"}>
    <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}> Pick the value of your bet
    </Text>
    <Text fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>It only depends on you how much you're willing to bet on your luck
    </Text>
  </Flex>
</Flex>
{/* mother flex for Pick end*/}





  {/* mother flex for Enjoy start */}
  <Flex w="100%" gap="1rem" pl="1rem">
  <Flex
  w="3rem"
  h="3rem"
    bgColor="#BBD3FD"
    borderRadius={"50%"}
    justifyContent="center"
    alignItems={"center"}
  >
    {" "}
    <Icon as={BsEmojiSmile} fontSize="xl" color="black" />{" "}
  </Flex>

  <Flex w="90%" direction={"column"} >
    <Text fontSize="md" fontWeight="bold" color={"#BBD3FD"}> Enjoy!
    </Text>
   
  </Flex>
</Flex>
{/* mother flex for Enjoy end*/}

 </Flex>
      {/* mother flex for left potion end */}

      {/* mother flex for Right portion start */}

      <Flex w="40%" justifyContent="center">
        <Flex color="black"> {/* Right */}</Flex>{" "}
      </Flex>
      {/* mother flex for Right portion end */}
    </Flex>
    /* mother flex for all end */
  );
}
