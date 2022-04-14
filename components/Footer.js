import { Flex, Image, Text, SimpleGrid, Link, Button, Icon } from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { ImTwitter } from "react-icons/im";
import { AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return (
    /* mother flex for all start */
    <Flex w="100%" bgColor="#BBD3FD33" fill={"rgba(187, 211, 253, 0.2)"} alignItems="center" justifyContent="center">
      <SimpleGrid width={"85%"} columns={[4, 4, 4, 4, 4]} spacing={["3rem", "4rem", "5rem", "5rem", "6rem"]} py={".8rem"}>
        {/* flex for company start */}

        <Flex alignItems="center" justifyContent="start">
          <Image width="80.84px" height="42px" src="/Logo.png" alt="Logo" />
        </Flex>
        {/* flex for company end */}

        {/* flex for buttons start */}
        <Flex gap="1rem" alignItems="center">
          <Link href="">
            <Button fontSize="xs" variant="link" color="gray.400">
              Terms
            </Button>
          </Link>
          <Link href="">
            <Button fontSize="xs" variant="link" color="gray.400">
              Privacy
            </Button>
          </Link>
          <Link href="">
            <Button fontSize="xs" variant="link" color="gray.400">
              Cookies
            </Button>
          </Link>
        </Flex>
        {/* flex for buttons end */}

        {/* flex for rights start  */}

        <Flex alignItems="center">
          <Text fontSize="xs" color="gray.400">
            ©2022 Company. All Rights Reserved.
          </Text>
        </Flex>
        {/* flex for rights end  */}

        {/* flex for social media icon start */}
        <Flex alignItems="center" justifyContent="center" gap="1rem">
          <Link href="" isExternal>
            <Icon as={ImTwitter} fontSize="sm" color="gray.500" />
          </Link>
          <Link href="" isExternal>
            <Icon as={AiFillLinkedin} fontSize="sm" color="gray.500" />
          </Link>
          <Link href="" isExternal>
            <Icon as={FaFacebook} fontSize="sm" color="gray.500" />
          </Link>
        </Flex>
        {/* flex for social media icon end */}
      </SimpleGrid>
    </Flex>
    /* mother flex for all end */
  );
}
