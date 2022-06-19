import { Box } from '@chakra-ui/react'
import React from 'react'
import RegisterForm from '../ui-library/components/RegisterForm'

type Props = {}

const Register = (props: Props) => {
  return (
    <Box
      bgColor={'gray.100'}
      height={'100vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <RegisterForm />
    </Box>
  )
}

export default Register