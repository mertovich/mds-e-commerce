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
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import {
    nameValidation,
    surnameValidation,
    emailValidation,
    passwordValidation,
    userTypeValidation,
    validationForm,
} from '../../utils/ValidationForm'

type Props = {}

const RegisterForm = (props: Props) => {
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [passwordConfirm, setPasswordConfirm] = useState<string>('')
    const [userType , setUserType] = useState<string>('')
    const toast = useToast()
    const navigate = useNavigate()
    const config = require('../../config.json')


    const handleSubmit = () => {
        const nameValidationResult = nameValidation(name)
        const surnameValidationResult = surnameValidation(surname)
        const emailValidationResult = emailValidation(email)
        const passwordValidationResult = passwordValidation(password,passwordConfirm)
        const userTypeValidationResult = userTypeValidation(userType)

        if(!nameValidationResult){
            toastMessage('error', 'name required Must be greater than 3 characters and less than 20 characters','error',3000,'top-right')
        }
        if(!surnameValidationResult){
            toastMessage('error', 'surname required Must be greater than 3 characters and less than 20 characters','error',3000,'top-right')
        }
        if(!emailValidationResult){
            toastMessage('error', 'email required Must be valid email','error',3000,'top-right')
        }
        if(!passwordValidationResult){
            toastMessage('error', 'password required Must be greater than 6 characters and less than 20 characters','error',3000,'top-right')
        }
        if(!userTypeValidationResult){
            toastMessage('error', 'user type required','error',3000,'top-right')
        }
        if(validationForm(name,surname,email,password,passwordConfirm,userType)){
            register()
        }

    }

    const toastMessage = (title: string, message: string, statusType: any = 'error', durationValue: number=9000,positionValue:any='top-right') => {
        toast({
            title: title,
            description: message,
            position: positionValue,
            status: statusType,
            duration: durationValue,
            isClosable: true,
        })
    }

    const register = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                surname: surname,
                email: email,
                password: password,
                account_type: userType,
            }),
        }
        fetch(`${config.api_url}/api/register`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.token !== 'Email already exists') {
                    toastMessage('Success', 'You have successfully registered', 'success', 3000,'bottom-right')
                    localStorage.setItem('token', data.token)
                    const decoded = jwt_decode(data.token)
                    localStorage.setItem('user', JSON.stringify(decoded))
                    navigate('/')
                }
                if(data.token === 'Email already exists') {
                    toastMessage('Error', 'Email already exists')
                }})
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
                    onChange={(e) => setName(e.target.value)}
                    variant='outline'
                    type={'text'}
                    placeholder='Name' />
                <Input
                    onChange={(e) => setSurname(e.target.value)}
                    variant='outline'
                    placeholder='Surname' />
            </HStack>
            <VStack>
                <Input
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
                        type={show ? 'text' : 'password'}
                        placeholder='Password confirmation'
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
                <Select
                    onChange={(e) => setUserType(e.target.value)}
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