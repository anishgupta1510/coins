import { Box, Image } from '@chakra-ui/react'
import React from 'react'
import imgsrc from '../assets/nwe.jpg'

function Home() {
  return (
    <>
    
      <Box bgColor={"blackAlpha.900"} w={"full"} h={"100vh"} >

        <Image w={"full"} h={"full"} objectFit={"contain"} src={imgsrc} />

      </Box>
    
    </>

  )
}

export default Home