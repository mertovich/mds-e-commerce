import {
  Box,
} from '@chakra-ui/react'
import React from 'react'
import LoginForm from '../ui-library/components/LoginForm'

type Props = {}

const Login = (props: Props) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      height={'100vh'}
      bgColor={'gray.100'}
    >
     <LoginForm/>
    </Box>
  )
}

export default Login