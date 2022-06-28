import {
    Box,
    Skeleton,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authValidation } from '../auth'
import HistoryList from '../ui-library/components/HistoryList'
import UserNavBar from '../ui-library/components/UserNavBar'

type Props = {}

const PurchaseHistory = (props: Props) => {
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
                <HistoryList />
            </Skeleton>
        </Box>
    )
}

export default PurchaseHistory