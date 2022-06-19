import {
    Box,
    HStack,
    Input,
    VStack,
    Button,
    InputGroup,
    InputRightElement,
    Select,
    useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'

type Props = {}

const RegisterForm = (props: Props) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('')
    const [status, setStatus] = useState<string>('')
    const [nameControl, setNameControl] = useState<boolean>(true)
    const [surnameControl, setSurnameControl] = useState<boolean>(true)
    const [passwordControl, setPasswordControl] = useState<boolean>(true)
    const [emailControl, setEmailControl] = useState<boolean>(true)
    const [statusControl, setStatusControl] = useState<boolean>(true)

    const toast = useToast()

    const handleSubmit = () => {
        nameAndSurnameValidation()
        passwordValidation()
        emailValidation()
        statusValdiation()
    }

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

    }

    const passwordValidation = () => {
        if (password.length <= 5) {
            setPasswordControl(false)
            toastMessage('Password Error', 'Password must be at least 6 characters long')
        }
        if (password.length > 20) {
            setPasswordControl(false)
            toastMessage('Password Error', 'Password must be less than 20 characters long')
        }
        if (passwordConfirmation.length <= 5) {
            setPasswordControl(false)
            toastMessage('Password Confirmation Error', 'Password Confirmation must be at least 6 characters long')
        }
        if (passwordConfirmation.length > 20) {
            setPasswordControl(false)
            toastMessage('Password Confirmation Error', 'Password Confirmation must be less than 20 characters long')
        }
        if (password !== passwordConfirmation) {
            setPasswordControl(false)
            toastMessage('Password Confirmation Error', 'Password Confirmation must be the same as Password')
        }
        if (password.length >= 6 && password.length <= 20 && password.length === passwordConfirmation.length && passwordConfirmation.length >= 6 && passwordConfirmation.length <= 20) {
            setPasswordControl(true)
        }
    }

    const statusValdiation = () => {
        if(status === ''){
            setStatusControl(false)
            toastMessage('Account type', 'Account type must be selected')
        }
        if (status === 'Customer' || status === 'Company') {
            setStatusControl(true)
        } else {
            setStatusControl(false)
        }
    }

    return (
        <Box
            bgColor={'white'}
            borderRadius={'10px'}
            boxShadow={'2xl'}
        >
            <HStack
                marginTop={2}>
                <Input
                    isInvalid={!nameControl}
                    onChange={(e) => setName(e.target.value)}
                    variant='outline'
                    type={'text'}
                    placeholder='Name' />
                <Input
                    isInvalid={!surnameControl}
                    onChange={(e) => setSurname(e.target.value)}
                    variant='outline'
                    placeholder='Surname' />
            </HStack>
            <VStack>
                <Input
                    isInvalid={!emailControl}
                    onChange={(e) => setEmail(e.target.value)}
                    variant='outline'
                    marginTop={2}
                    placeholder='Email' />
                type={'email'}
                <InputGroup
                    marginTop={2}
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
                    marginTop={2}
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
                <Select
                    isInvalid={!statusControl}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder='Account type'>
                    <option value='Customer'>Customer</option>
                    <option value='Company'>Company</option>
                </Select>
            </VStack>
            <Button
                size={'lg'}
                onClick={handleSubmit}
                variant='solid'
                marginTop={2}
                colorScheme='blue'
                width={'100%'}
                borderTopLeftRadius={'0px'}
                borderTopRightRadius={'0px'}
            >Register
            </Button>
        </Box>
    )
}

export default RegisterForm