import { Box, Skeleton } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import MyProductList from '../ui-library/components/MyProductList'
import { useNavigate } from 'react-router-dom'
import { authValidation } from '../auth/index'
import UserNavBar from '../ui-library/components/UserNavBar'

type Props = {}

const CustomerProductList = (props: Props) => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        authNavigate()
      }, [])


    const authNavigate = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const control = authValidation(token)
            if (!control) {
                navigate('/')
            } else {
                const user = localStorage.getItem('user')
                if (user) {
                    const userObj = JSON.parse(user)
                    if (userObj.id[0] === '2' ) {
                        setLoading(true)
                    } else {
                        navigate('/')
                    }
                }
            }
        } else {
            navigate('/')
        }
    }

  return (
    <Box>
        <Skeleton isLoaded={loading} >
            <UserNavBar/>
        <MyProductList/>
        </Skeleton>
    </Box>
  )
}

export default CustomerProductList