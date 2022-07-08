import { Box, Skeleton } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { authValidation } from '../auth/index'
import NavBar from '../ui-library/components/NavBar'
import ProductList from '../ui-library/components/ProductList'
import UserNavBar from '../ui-library/components/UserNavBar'
import { useParams } from 'react-router-dom'

type Props = {}

const ProductCategory = (props: Props) => {
    const [user, setUser] = useState<boolean | null>(false)
    const [login, setLogin] = useState<boolean>(false)
    const [ProductsCategory, setProductsCategory] = useState<string>('all')

    const { category } = useParams()


    useEffect(() => {
        userControl()
        ProductsCategoryControl()
    }, [])

    const ProductsCategoryControl = () => {
        if(category) {
            setProductsCategory(category)
        } else {
            setProductsCategory('all')
        }
    }

    const userControl = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            let user = await authValidation(token)
            if (user) {
                setUser(user)
                setLogin(true)
            } else {
                setUser(false)
                setLogin(true)
            }
        } else {
            setUser(false)
            setLogin(true)
        }
    }

    return (
        <Box>
            <Skeleton
                isLoaded={login}
            >
                {
                    user ? <UserNavBar /> : <NavBar />
                }
                <ProductList ProductsCategory={ProductsCategory} />
            </Skeleton>
        </Box>
    )
}

export default ProductCategory