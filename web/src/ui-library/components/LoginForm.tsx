import React, {useState} from 'react'
import { EmailIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Text,
    VStack,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement
  } from '@chakra-ui/react'

type Props = {}

const LoginForm = (props: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [emailControl, setEmailControl] = useState<boolean>(true)
    const [passwordControl, setPasswordControl] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
  
    const handleClick = () => setShow(!show)
  
    const emailValidate = () => {
      if (email.length <= 20 && email.includes('@') && email.includes('.') && email.length >= 5) {
        setEmailControl(true)
      } else {
        setEmailControl(false)
      }
    }
  
    const passwordValidate = () => {
      if (password.length >= 6 && password.length <= 20 && password !== '') {
        setPasswordControl(true)
      } else {
        setPasswordControl(false)
      }
    }
  
    const loginHandler = () => {
      emailValidate()
      passwordValidate()
    }
    return (
        <Box
            textAlign={'center'}
            bgColor={'white'}
            boxShadow={'2xl'}
            width={'xl'}
            borderRadius={'10px'}
        >
            <InputGroup
                marginTop={'2'}
                marginBottom={'2'}
            >
                <InputLeftElement
                    pointerEvents='none'
                    children={<EmailIcon color='gray.300' />}
                />
                <Input
                    type='text'
                    placeholder='e-mail'
                    isInvalid={!emailControl}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </InputGroup>
            <InputGroup size='md'
                marginTop={'2'}
                marginBottom={'2'}
            >
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
                    placeholder='Enter password'
                    isInvalid={!passwordControl}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </Button>
                </InputRightElement>
            </InputGroup>
            <Text
                color={'gray.400'}
                fontSize={'sm'}
                padding={'2'}
                marginTop={'2'}
                marginBottom={'2'}
                textAlign={'start'}
                _hover={{ color: 'blue.400' }}
            >
                Forgot password?
            </Text>
            <Button
                size='lg'
                colorScheme='blue'
                marginTop={'2'}
                width={'100%'}
                borderTopLeftRadius={'0px'}
                borderTopRightRadius={'0px'}
                onClick={loginHandler}
            >
                Login
            </Button>
        </Box>
    )
}

export default LoginForm