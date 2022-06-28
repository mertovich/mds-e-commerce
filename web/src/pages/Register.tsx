import {
  Box,
  Skeleton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import RegisterForm from '../ui-library/components/RegisterForm'
import { useNavigate } from 'react-router-dom'
import { authValidation } from '../auth/index'

type Props = {}

const Register = (props: Props) => {
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    authNavigate()
  }, [])

  const authNavigate = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      const control = await authValidation(token)
      if (control) {
        navigate('/')
      }
    } else {
      setLoading(true)
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
      <Skeleton isLoaded={loading} >
        <RegisterForm />
      </Skeleton>
    </Box>
  )
}

export default Register