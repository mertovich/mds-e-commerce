import React, { useEffect } from 'react'
import { authValidation } from '../auth'
import {useNavigate} from 'react-router-dom'
import UserNavBar from '../ui-library/components/UserNavBar'
import SettingsForm from '../ui-library/components/SettingsForm'
import { Box } from '@chakra-ui/react'

type Props = {}

const Settings = (props: Props) => {
    const navigate = useNavigate()

    useEffect(() => {
        authNavigate()
    }, [])

    const authNavigate = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const control = await authValidation(token)
            if (!control) {
                navigate('/')
            }
        }
        else if (token !== "") {
            navigate('/')
        }
    }

    return (
        <Box>
            <UserNavBar/>
            <SettingsForm/>
        </Box>
    )
}

export default Settings