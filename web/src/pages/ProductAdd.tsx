import { 
    Box, 
    Skeleton,
} from '@chakra-ui/react'
import React, { useEffect,useState } from 'react'
import ProductAddForm from '../ui-library/components/ProductAddForm'
import UserNavBar from '../ui-library/components/UserNavBar'
import { authValidation } from '../auth/index'
import { useNavigate } from 'react-router-dom'

type Props = {}

const ProductAdd = (props: Props) => {
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
            <ProductAddForm/>
        </Skeleton>
    </Box>
  )
}

export default ProductAdd