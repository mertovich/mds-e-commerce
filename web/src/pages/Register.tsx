import { Box } from '@chakra-ui/react'
import React,{useEffect} from 'react'
import RegisterForm from '../ui-library/components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { authValidation } from '../auth/index'

type Props = {}

const Register = (props: Props) => {
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
    } else {
      navigate('/login')
    }
  }

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