import {
    Box,
    HStack,
    Input,
    VStack,
    Button,
    InputGroup,
    InputRightElement,
    Select,
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
    const [nameAndSurnameControl, setNameAndSurnameControl] = useState<boolean>(true)
    const [passwordControl, setPasswordControl] = useState<boolean>(true)
    const [emailControl, setEmailControl] = useState<boolean>(true)
    const [statusControl, setStatusControl] = useState<boolean>(true)

    const handleSubmit = () => {
        nameAndSurnameValidation()
        passwordValidation()
        emailValidation()
        statusValdiation()
    }

    const nameAndSurnameValidation = () => {
        if (name.length > 2 && surname.length > 2 && name.length <= 15 && surname.length <= 15) {
            setNameAndSurnameControl(true)
        } else {
            setNameAndSurnameControl(false)
        }
    }

    const emailValidation = () => {
        if (email.includes('@') && email.includes('.') && email.length > 5 && email.length < 20) {
            setEmailControl(true)
        } else {
            setEmailControl(false)
        }

    }

    const passwordValidation = () => {
        if (password.length >= 6 && passwordConfirmation.length >= 6 && password === passwordConfirmation && password.length <= 20 && passwordConfirmation.length <= 20) {
            setPasswordControl(true)
        } else {
            setPasswordControl(false)
        }
    }

    const statusValdiation = () => {
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
                    isInvalid={!nameAndSurnameControl}
                    onChange={(e) => setName(e.target.value)}
                    variant='outline'
                    type={'text'}
                    placeholder='Name' />
                <Input
                    isInvalid={!nameAndSurnameControl}
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