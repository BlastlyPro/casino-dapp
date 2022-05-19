import { Flex, Text, SimpleGrid, Link, Button, Icon, chakra, Box, useColorModeValue, useDisclosure, VStack, IconButton, CloseButton } from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";

export default function Navbar({ connectWallet }) {
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();
  return (
    <>
      <Flex w="85%" pt={"2"}>
        <SimpleGrid columns={[3, 3, 3, 3, 3]} spacing={["3rem", "8rem", "14rem", "9rem", "6rem"]}>
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

            <Flex bgColor="gray.400" borderRadius="2rem" px="1rem" py="0.5rem" gap="0.5rem">
              <Link href="">
                <Button fontSize="xs" variant="link" color="#FFFFFF">
                  Coin Toss
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

          <Flex alignItems="center" justifyContent="end" display={{ base: "none", md: "inline-flex" }}>
            <Button onClick={connectWallet} bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
              Connect Your wallet
            </Button>
          </Flex>
          {/* flex for wallet end */}
        </SimpleGrid>

        <Box display={{ base: "inline-flex", md: "none" }}>
          <IconButton display={{ base: "flex", md: "none" }} aria-label="Open menu" fontSize="20px" color={"#F2F4F7"} variant="ghost" icon={<AiOutlineMenu />} onClick={mobileNav.onOpen} />

          <VStack pos="absolute" top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"} flexDirection="column" p={2} pb={4} m={2} bg={bg} spacing={3} rounded="sm" shadow="sm">
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
              <Button onClick={connectWallet} bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
                Connect Your wallet
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}
