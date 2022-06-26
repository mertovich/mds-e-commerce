import {
  Box,
} from '@chakra-ui/react'
import React,{useEffect} from 'react'
import LoginForm from '../ui-library/components/LoginForm'
import {useNavigate} from 'react-router-dom'
import {authValidation} from '../auth/index'

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    authNavigate()
  }, [])

  const authNavigate = async () => {
    const token = localStorage.getItem('token')
    if(token) {
      const control = await authValidation(token)
      if(control) {
        navigate('/')
      }
    }
  }

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