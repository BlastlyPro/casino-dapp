import { Flex, Text, SimpleGrid, Link, Button, Icon, chakra, Box, useColorModeValue, useDisclosure, VStack, IconButton, CloseButton } from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import Web3 from "web3";
import Web3Modal from "web3modal";

export default function LuckyNavbar() {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <>
      <Flex  w="85%" pt={"2"}>
        <SimpleGrid width={"100%"} columns={[3, 3, 3, 3, 3]} spacing={["3rem", "8rem", "18rem", "9rem", "6rem"]} >
          {/* flex for company start */}
          <Flex alignItems="center" justifyContent="start">
            <Image width="80.84px" height="42px" src="/Logo.png" alt="Logo" />
          </Flex>
          {/* flex for company end */}

          {/* flex for buttons start */}
          <Flex gap="1rem" alignItems="center" justifyContent="center" display={{ base: "none", md: "inline-flex" }}>
            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Terms
              </Button>
            </Link>
            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Games
                <Icon as={RiArrowDropDownLine} fontSize="md" color="gray.500" />
              </Button>
            </Link>

            <Flex bgColor={"rgba(187, 211, 253, 0.2)"} borderRadius="2rem" px="1rem" py="0.5rem" gap="0.5rem">
              <Button fontSize="xs" variant="link">
                
                <Image width="15px" height="15px" src="/luckyarrow.png" alt="luckyarrow.png" />
              </Button>

              <Link href="">
                <Button fontSize="xs" variant="link" color="#FFFFFF">
                  Lucky Range
                </Button>
              </Link>

              <Link href="">
                <Button fontSize="xs" variant="link" color="#FFFFFF">
                  History
                </Button>
              </Link>

              <Link href="">
                <Button fontSize="xs" variant="link" color="#FFFFFF">
                  How it works?
                </Button>
              </Link>
            </Flex>

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Exchange
              </Button>
            </Link>

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                About
              </Button>
            </Link>
          </Flex>
          {/* flex for buttons end */}

          {/* flex for wallet start */}

          <Flex red display={{ base: "none", md: "inline-flex" }} alignItems="center" justifyContent="end">
            <Text textAlign={"center"} bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
              Connect Your wallet
            </Text>
          </Flex>
          {/* flex for wallet end */}
        </SimpleGrid>
        
        <Box display={{ base: "inline-flex", md: "none" }} zIndex="999">
          <IconButton display={{ base: "flex", md: "none" }} aria-label="Open menu" fontSize="20px" color={"#F2F4F7"} variant="ghost" icon={<AiOutlineMenu />} onClick={mobileNav.onOpen} />

          <VStack pos="absolute" top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"} flexDirection="column" p={2} pb={4} m={2} bg={bg} spacing={3} rounded="sm" shadow="sm" bgColor={"gray.400"}>
            <CloseButton color="black" aria-label="Close menu" onClick={mobileNav.onClose} />

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Terms
              </Button>
            </Link>
            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Games
                <Icon as={RiArrowDropDownLine} fontSize="md" color="gray.500" />
              </Button>
            </Link>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Image width="16.67px" height="16.67px" src="/icon.png" alt="icon.png" />
            </Button>
            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Coin Toss
              </Button>
            </Link>

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                History
              </Button>
            </Link>

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                How it works?
              </Button>
            </Link>
            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                Exchange
              </Button>
            </Link>

            <Link href="">
              <Button fontSize="xs" variant="link" color="gray.500">
                About
              </Button>
            </Link>
            <Flex>
              <Text bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
                Connect Your wallet
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}
