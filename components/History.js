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
  
  direction={"column"}
      >
        
     <Text fontSize="2xl" fontWeight="bold" color={"#FFFFFF"} py="2rem"   px="7rem">
      History
    </Text>
    {/* mother flex for combined left leader board and right all bets start */}

<Flex w="100%">

{/* mother flex for left portion start */}
<Flex w="40%" >

</Flex>
{/* mother flex for left portion end */}

</Flex>

    {/* mother flex for combined left leader board and right all bets end */}

      </Flex>
      /* mother flex for all end */
    );
  }
  