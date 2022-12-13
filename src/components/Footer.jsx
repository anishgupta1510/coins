import { Box, Text ,Stack,VStack } from '@chakra-ui/react'
import React from 'react'

function Footer() {
  return (
    <>
    
        <Box bgColor={"blackAlpha.900"} color={"gold"} px={"16"} py={"8"} minH={"28"} >
        <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About the Site</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            This site shows all the information related to the Cryptocurrency and Exchanges.
          </Text>
          <a href="https://github.com/anishgupta1510">GITHUB</a>
        </VStack>
      </Stack>
        </Box>

        
    
    </>
  )
}

export default Footer