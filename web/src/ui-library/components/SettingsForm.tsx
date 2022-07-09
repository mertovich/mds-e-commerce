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

type Props = {}

const SettingsForm = (props: Props) => {
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
  const [nameControl, setNameControl] = useState<boolean>(true)
  const [surnameControl, setSurnameControl] = useState<boolean>(true)
  const [passwordControl, setPasswordControl] = useState<boolean>(true)
  const [emailControl, setEmailControl] = useState<boolean>(true)
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
    nameAndSurnameValidation()
    emailValidation()
    if (nameControl && surnameControl && passwordValidation() && emailControl) {
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

  const nameAndSurnameValidation = () => {
    if (name.length <= 2) {
      setNameControl(false)
      toastMessage('Name Error', 'Name must be at least 3 characters long')
    }
    if (surname.length <= 2) {
      setSurnameControl(false)
      toastMessage('Surname Error', 'Surname must be at least 3 characters long')
    }
    if (name.length > 15) {
      setNameControl(false)
      toastMessage('Name Error', 'Name must be less than 15 characters long')
    }
    if (surname.length > 15) {
      setSurnameControl(false)
      toastMessage('Surname Error', 'Surname must be less than 15 characters long')
    }
    if (name.length > 2 && surname.length > 2 && name.length < 15 && surname.length < 15) {
      setNameControl(true)
    }
    if (name.length >= 3 && name.length <= 15) {
      setNameControl(true)
    }
    if (surname.length >= 3 && surname.length <= 15) {
      setSurnameControl(true)
    }
    if (name === "") {
      setNameControl(true)
      setName(user.name)
    }
    if (surname === "") {
      setSurnameControl(true)
      setSurname(user.surname)
    }
  }

  const emailValidation = () => {
    if (email.length <= 5) {
      setEmailControl(false)
      toastMessage('Email Error', 'Email must be at least 6 characters long')
    }
    if (email.length > 20) {
      setEmailControl(false)
      toastMessage('Email Error', 'Email must be less than 20 characters long')
    }
    if (!email.includes('@')) {
      setEmailControl(false)
      toastMessage('Email Error', 'Email must contain @')
    }
    if (!email.includes('.')) {
      setEmailControl(false)
      toastMessage('Email Error', 'Email must contain .')
    }
    if (email.length >= 6 && email.length <= 20 && email.includes('@') && email.includes('.')) {
      setEmailControl(true)
    }
    if (email === "") {
      setEmailControl(true)
      setEmail(user.email)
    }

  }

  const passwordValidation = (): boolean => {
    if (password.length <= 5) {
      setPasswordControl(false)
      toastMessage('Password Error', 'Password must be at least 6 characters long')
      return false
    }
    if (password.length > 20) {
      setPasswordControl(false)
      toastMessage('Password Error', 'Password must be less than 20 characters long')
      return false
    }
    if (passwordConfirmation.length <= 5) {
      setPasswordControl(false)
      toastMessage('Password Confirmation Error', 'Password Confirmation must be at least 6 characters long')
      return false
    }
    if (passwordConfirmation.length > 20) {
      setPasswordControl(false)
      toastMessage('Password Confirmation Error', 'Password Confirmation must be less than 20 characters long')
      return false
    }
    if (password !== passwordConfirmation) {
      setPasswordControl(false)
      toastMessage('Password Confirmation Error', 'Password Confirmation must be the same as Password')
      return false
    }
    if (password.length >= 6 && password.length <= 20 && password.match(passwordConfirmation) && passwordConfirmation.length >= 6 && passwordConfirmation.length <= 20) {
      setPasswordControl(true)
      return true
    }
    return false
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
            isInvalid={!nameControl}
            onChange={(e) => setName(e.target.value)}
            variant='outline'
            type={'text'}
            placeholder={`${user.name}`} />
          <Input
            isInvalid={!surnameControl}
            onChange={(e) => setSurname(e.target.value)}
            variant='outline'
            placeholder={`${user.surname}`} />
        </HStack>
        <VStack>
          <Input
            isInvalid={!emailControl}
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
              isInvalid={!passwordControl}
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
              isInvalid={!passwordControl}
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