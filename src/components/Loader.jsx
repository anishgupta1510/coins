import { Box, Spinner, VStack } from '@chakra-ui/react'
import React from 'react'
import {FillingBottle} from 'react-cssfx-loading'

function Loader() {
  return (
    <>
      <VStack h={"90vh"} justifyContent={"center"}>

        <Box transform={"scale(1)"}>
            {/* <Spinner size={"x1"}/> */}
            <FillingBottle color='black' duration='4s' />
        </Box>

      </VStack>
    </>
  )
}

export default Loader