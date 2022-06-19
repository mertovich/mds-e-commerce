import React, {useState} from 'react'
import { EmailIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Text,
    InputGroup,
    InputLeftElement,
    Input,
    InputRightElement,
    useToast,
  } from '@chakra-ui/react'

type Props = {}

const LoginForm = (props: Props) => {
    const [show, setShow] = useState<boolean>(false)
    const [emailControl, setEmailControl] = useState<boolean>(true)
    const [passwordControl, setPasswordControl] = useState<boolean>(true)
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
  
    const handleClick = () => setShow(!show)
    const toast = useToast()

    const toastMessage = (title: string, message: string) => {
        toast({
            title: title,
            description: message,
            position: 'top-right',
            status: 'error',
            duration: 9000,
            isClosable: true,
        })
    }
  
    const emailValidate = () => {
      if (email.length <=5) {
        setEmailControl(false)
        toastMessage('Email', 'Email is too short')
      }
      if(email.length > 20) {
        setEmailControl(false)
        toastMessage('Email', 'Email is too long')
      }
        if(email.length > 5 && email.length < 20) {
            setEmailControl(true)
        }
    }
  
    const passwordValidate = () => {
        if(password.length <= 5) {
            setPasswordControl(false)
            toastMessage('Password', 'Password is too short')
        }
        if(password.length > 20) {
            setPasswordControl(false)
            toastMessage('Password', 'Password is too long')
        }
        if(password.length > 5 && password.length < 20) {
            setPasswordControl(true)
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