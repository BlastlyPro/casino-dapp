import { Flex, Text, chakra, Button, Divider, Input, Box, useMediaQuery, RangeSlider, RangeSliderTrack, RangeSliderFilledTrack, RangeSliderThumb, ChakraProvider } from "@chakra-ui/react";
import Image from "next/image";

export default function LuckyMobileAfterPlace() {
  return (
    <Flex w={["100%", "100%", "100%", "50%", "50%"]} alignItems="center" justifyContent="center" direction="column">
      <Flex
        bgColor={"rgba(86, 146, 250, 0.6)"}
        w={["100%", "100%", "100%", "94%", "94%"]}
        h={["41.25rem", "41.25rem", "41.25rem", "41.25rem", "41.25rem"]}
        opacity={".9"}
        backdrop-filter="blur(20px)"
        borderRadius="1rem"
        direction={"Column"}
        gap="2rem"
      >
        <Flex direction={"Column"} pt="1.5rem">
          <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
            You Win!
          </Text>
          <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
            You guessed correct range!
          </Text>
        </Flex>

        <Flex gap="1rem" alignSelf={"center"} justifyContent={"center"} direction="column">
          <Flex>
            <Image width="90px" height="116.99px" src="/ten.svg" alt="ten" />
          </Flex>

          <RangeSlider aria-label={["min", "max"]} colorScheme="pink" defaultValue={[10, 30]}>
            <RangeSliderTrack>
              <RangeSliderFilledTrack />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
            <RangeSliderThumb index={1} />
          </RangeSlider>
        </Flex>

        <Flex gap="2rem" w="80%" alignSelf={"center"} direction={"column"}>
          <Flex alignSelf={"center"} gap="1rem">
            <Text textAlign="center" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
              Your range:{" "}
              <chakra.span fontSize="md" color="white" fontWeight={"bold"}>
                10-65
              </chakra.span>{" "}
            </Text>
            <Image width="10px" height="5px" src={"/right.png"} alt="right" />
          </Flex>
          <Divider alignSelf={"center"} />
          <Flex alignSelf={"center"} gap="2rem">
            <Flex direction="column">
              <Text textAlign="end" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                Bet:
              </Text>
              <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                1000 BNB
              </Text>
            </Flex>
            <Flex direction="column">
              <Text textAlign="start" fontSize="sm" color={"rgba(255, 255, 255, 0.6)"}>
                Payout:
              </Text>
              <Text textAlign="center" fontSize="md" fontWeight={"bold"} color={"white"}>
                1980 BNB
              </Text>
            </Flex>
          </Flex>

          <Button background="#102542" color="white" borderRadius="30px">
            {" "}
            Claim your win!
          </Button>

          <Button background="rgba(187, 211, 253, 0.2)" color="white" borderRadius="30px">
            {" "}
            Play agin!
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
