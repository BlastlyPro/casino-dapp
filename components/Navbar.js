import { useState, useEffect, useContext } from "react";
import { Flex, Text, SimpleGrid, Button, Icon, chakra, Box, useColorModeValue, useDisclosure, VStack, IconButton, CloseButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { RiArrowDropDownLine } from "react-icons/ri";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { MainContext } from "./providers/MainProvider";

export default function Navbar() {
  const {connect} = useContext(MainContext);
  const bg = useColorModeValue("white", "gray.800");
  const mobileNav = useDisclosure();

  return (
    <>
      <Flex w="85%" pt={"2"}>
        <SimpleGrid width={"100%"} columns={[3, 3, 3, 3, 3]} spacing={["3rem", "8rem", "14rem", "9rem", "6rem"]}>
          {/* flex for company start */}
          <Flex alignItems="center" justifyContent="start">
            <Image width="80.84px" height="42px" src="/Logo.png" alt="Logo" />
          </Flex>
          {/* flex for company end */}

          {/* flex for buttons start */}
          <Flex gap="1rem" alignItems="center" justifyContent="center" display={{ base: "none", md: "inline-flex" }}>
            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">Terms</Link>
            </Button>

            <Menu>
              <MenuButton bgColor="transparent" size="xs" pt="0.2rem" pl={".2rem"} pr="3.5rem" color="gray.500" as={Button}>
                Games
              </MenuButton>
              <MenuList backgroundColor={"gray.700"} border="none">
                <MenuItem _hover={{bgColor:"gray.500"}}><Link href={"/"}>Coin Toss</Link></MenuItem>
                <MenuItem _hover={{bgColor:"gray.500"}}><Link href={"/lucky-range"}>Lucky Range</Link></MenuItem>
                <MenuItem _hover={{bgColor:"gray.500"}}>Roulette</MenuItem>
              </MenuList>
            </Menu>
            <ChevronDownIcon color={"white"} zIndex="999" ml={"-2rem"} mt={"0.2rem"} />

            <Flex bgColor="gray.400" borderRadius="2rem" px="1rem" py="0.5rem" gap="0.5rem">
              <Button fontSize="xs" variant="link">
                <Image width="16.67px" height="16.67px" src="/icon.png" alt="icon.png" />
              </Button>
              <Button fontSize="xs" variant="link" color="#FFFFFF">
                <Link href="">Coin Toss</Link>
              </Button>

              <Button fontSize="xs" variant="link" color="#FFFFFF">
                <Link href="">History</Link>
              </Button>

              <Button fontSize="xs" variant="link" color="#FFFFFF">
                <Link href="">How it works?</Link>
              </Button>
            </Flex>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">Exchange</Link>
            </Button>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">About</Link>
            </Button>
          </Flex>
          {/* flex for buttons end */}

          {/* flex for wallet start */}

          <Flex alignItems="center" justifyContent="end" display={{ base: "none", md: "inline-flex" }}>
            <Button onClick={connect} bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
              Connect Your wallet
            </Button>
          </Flex>
          {/* flex for wallet end */}
        </SimpleGrid>

        <Box display={{ base: "inline-flex", md: "none" }} zIndex="999">
          <IconButton display={{ base: "flex", md: "none" }} aria-label="Open menu" fontSize="20px" color={"#F2F4F7"} variant="ghost" icon={<AiOutlineMenu />} onClick={mobileNav.onOpen} />

          <VStack pos="absolute" top={0} left={0} right={0} display={mobileNav.isOpen ? "flex" : "none"} flexDirection="column" p={2} pb={4} m={2} bg={bg} spacing={3} rounded="sm" shadow="sm" bgColor={"gray.400"}>
            <CloseButton color="black" aria-label="Close menu" onClick={mobileNav.onClose} />

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">Terms</Link>
            </Button>
            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">Games</Link>
              <Icon as={RiArrowDropDownLine} fontSize="md" color="gray.500" />
            </Button>

            <Image width="16.67px" height="16.67px" src="/icon.png" alt="icon.png" />
            <Button pl="0.2rem" fontSize="xs" variant="link" color="gray.500">
              <Link href="">Coin Toss</Link>
            </Button>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">History</Link>
            </Button>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">How it works?</Link>
            </Button>
            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">Exchange</Link>
            </Button>

            <Button fontSize="xs" variant="link" color="gray.500">
              <Link href="">About</Link>
            </Button>
            <Flex>
              <Text onClick={connect} bgColor="#BBD3FD" borderRadius="1rem" p={["0.5rem", "0.5rem", "0.5rem", "0.5rem", "0.5rem"]} fontSize="xs" color="#102542">
                Connect Your wallet
              </Text>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
}
