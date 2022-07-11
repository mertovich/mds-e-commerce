import {
  Box,
  HStack,
  Input,
  VStack,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {
  nameValidation,
  surnameValidation,
  emailValidation,
  passwordValidation,
} from '../../utils/ValidationForm'

type Props = {}

const SettingsForm = (props: Props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

  const toast = useToast()
  const config = require('../../config.json')

  useEffect(() => {
    getUser()
  }, [])

  const getUser = async () => {
    const usr = localStorage.getItem('user')
    if (usr) {
      const usrTmp = JSON.parse(usr)
      await setUser(usrTmp)
      await setName(usrTmp.name)
      await setSurname(usrTmp.surname)
      await setEmail(usrTmp.email)
    }
  }

  const handleSubmit = () => {
    const nameValidationResult = nameValidation(name)
    const surnameValidationResult = surnameValidation(surname)
    const emailValidationResult = emailValidation(email)
    const passwordValidationResult = passwordValidation(password, passwordConfirmation)

    if (!nameValidationResult) {
      toastMessage('error', 'name required Must be greater than 3 characters and less than 20 characters', 'error', 3000, 'top-right')
    }
    if (!surnameValidationResult) {
      toastMessage('error', 'surname required Must be greater than 3 characters and less than 20 characters', 'error', 3000, 'top-right')
    }
    if (!emailValidationResult) {
      toastMessage('error', 'email required Must be valid email', 'error', 3000, 'top-right')
    }
    if (!passwordValidationResult) {
      toastMessage('error', 'password required Must be greater than 6 characters and less than 20 characters', 'error', 3000, 'top-right')
    }
    if (nameValidationResult && surnameValidationResult && emailValidationResult && passwordValidationResult) {
      update()
    }

  }

  const toastMessage = (title: string, message: string, statusType: any = 'error', durationValue: number = 9000, positionValue: any = 'top-right') => {
    toast({
      title: title,
      description: message,
      position: positionValue,
      status: statusType,
      duration: durationValue,
      isClosable: true,
    })
  }

  const update = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: user.id,
        name: name,
        surname: surname,
        email: email,
        password: password,
        token: localStorage.getItem('token'),
      }),
    }
    fetch(`${config.api_url}/api/user/update`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'Success') {
          toastMessage('Success', 'User updated successfully', 'success', 3000, 'top-right')
          localStorage.setItem('token', data.token)
          let usr = jwt_decode(data.token)
          localStorage.setItem('user', JSON.stringify(usr))
        }
      })
  }


  return (
    <Box
      bgColor={'gray.100'}
      height={'90vh'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        bgColor={'white'}
        borderRadius={'10px'}
        boxShadow={'2xl'}
        width={'80vw'}
      >
        <HStack
          marginTop={2}>
          <Input
            onChange={(e) => setName(e.target.value)}
            variant='outline'
            type={'text'}
            placeholder={`${user.name}`} />
          <Input
            onChange={(e) => setSurname(e.target.value)}
            variant='outline'
            placeholder={`${user.surname}`} />
        </HStack>
        <VStack>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            variant='outline'
            marginTop={4}
            placeholder={`${user.email}`} />
          type={'email'}
          <InputGroup
            marginTop={4}
            size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Enter password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
          <InputGroup
            marginTop={4}
            size='md'>
            <Input
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              placeholder='Password confirmation'
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </VStack>
        <Button
          size={'lg'}
          onClick={handleSubmit}
          variant='solid'
          marginTop={4}
          colorScheme='blue'
          width={'100%'}
          borderTopLeftRadius={'0px'}
          borderTopRightRadius={'0px'}
        >Update
        </Button>
      </Box>
    </Box>
  )
}

export default SettingsForm