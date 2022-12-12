import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'

function Loader() {
  return (
    <>
      <VStack h={"90vh"} justifyContent={"center"}>

        <Box transform={"scale(20)"}>
            <Spinner size={"x1"}/>
        </Box>

      </VStack>
    </>
  )
}

export default Loader