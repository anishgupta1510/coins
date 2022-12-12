import { Alert, AlertIcon } from '@chakra-ui/react'
import React from 'react'

function ErrorComponent(props) {
  return (
    <Alert status='error' position={"fixed"} bottom={"4"}>
      <AlertIcon/>
      {props.message}
    </Alert>
  )
}

export default ErrorComponent