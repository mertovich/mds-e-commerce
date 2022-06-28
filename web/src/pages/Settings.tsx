import React, { useEffect, useState } from 'react'
import { authValidation } from '../auth'
import { useNavigate } from 'react-router-dom'
import UserNavBar from '../ui-library/components/UserNavBar'
import SettingsForm from '../ui-library/components/SettingsForm'
import {
    Box,
    Skeleton,
} from '@chakra-ui/react'

type Props = {}

const Settings = (props: Props) => {
    const [loading, setLoading] = useState(false)

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
            } else {
                setLoading(true)
            }
        }
        else if (token !== "") {
            navigate('/')
        }
    }

    return (
        <Box>
            <Skeleton isLoaded={loading} >
                <UserNavBar />
                <SettingsForm />
            </Skeleton>
        </Box>
    )
}

export default Settings