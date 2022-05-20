<Flex w={["100%", "100%", "100%", "50%", "50%"]}  alignItems="center" justifyContent="center" direction="column">
<Flex bgColor={"rgba(86, 146, 250, 0.6)"}  w={["100%", "100%", "100%", "94%", "94%"]} h={["30.125rem", "30.125rem", "25.437rem", "25.437rem", "25.437rem"]} opacity={".9"} backdrop-filter="blur(20px)" borderRadius="1rem" direction={"Column"}>
  <Flex direction={"Column"} pt="1.5rem">
    <Text textAlign="center" fontSize="2xl" fontWeight="bold" color={"#FFFFFF"}>
      
      Select Your Side!
    </Text>
    <Text textAlign="center" fontSize="xl" color={"rgba(255, 255, 255, 0.6)"}>
      
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
    <Flex gap={5} marginX={3}>
      <Box _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }} transition={"all .5s"} onClick={() => setChoice(true)} transform={choice === true ? "scale(1.1)" : "scale(1)"}>
        <Image width="120px" height="120px" src="/Heads.png" alt="Coin" />
      </Box>
      <Box _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }} transition={"all .5s"} onClick={() => setChoice(false)} transform={choice === false ? "scale(1.1)" : "scale(1)"}>
        <Image width="120px" height="120px" src="/Tails.png" alt="Coin" />
      </Box>
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
  <Flex alignSelf={"center"} direction={["column", "column", "column", "row", "row"]}>
    <Flex h="3rem" border="none" w="13.125rem" bgColor="white" fontSize="xs" color={"black"} borderRadius="30px 30px 0 0">
      
    <Flex pl="0.3rem" alignItems={"center"} justifyContent={"center"}>
        <Image width="20px" height="20px" src="/inputFrame.png" alt="inputFrame" />
        <Input border="none" bgColor="white" fontSize="xs" w="8rem" color={"#102542CC"} borderRadius="30px" placeholder={"1000MGT"} onChange={(e) => handleChange(e)} />
      </Flex>
      <Flex alignItems={"center"} justifyContent={"center"}>
        <Image width="16px" height="16px" src="/InputArrow.png" alt="InputArrow" />
      </Flex>
    </Flex>
    <Button
      
      alignItems="center"
      justifyContent={"center"}
      borderRadius="0 0 30px 30px"
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
      onClick={() => callCoinFlip(choice)}
    >
      <Text _hover={{ transform: "scale(1.2)" }} transition={"all .5s"}>
        
        Place Your Bet!
      </Text>
    </Button>
  </Flex>
  <Text textAlign="center" fontSize="sm" color={"white"} p="2rem">
    
    Winning Payout: 2x
  </Text>
</Flex>
</Flex>





  {/*      h="1rem" background="#FFFFFF"       <Flex w="0.625rem" h="0.625rem" borderRadius={"50%"} background={"#102542"}></Flex>
     <Flex w="40%" h="0.625rem" bgGradient={"linear-gradient(270deg, #FBBF2D 2.05%, #78D6BE 99.07%)"}></Flex>
     <Flex w="0.625rem" h="0.625rem" borderRadius={"50%"} background={"#102542"}></Flex> */}
