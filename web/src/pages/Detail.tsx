import {
    Box,
    VStack,
    Text,
    Skeleton,
    HStack,
    Image,
    Button,
    useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserNavBar from '../ui-library/components/UserNavBar'
import NavBar from '../ui-library/components/NavBar'
import { authValidation } from '../auth/index'


type Props = {}

const Detail = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<any>({})
    const [comments, setComments] = useState<any>([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [userType, setUserType] = useState<string>('customer')
    const [userControl, setuserControl] = useState<boolean | null>(false)


    const { id } = useParams()
    const toast = useToast()
    const config = require('../config')

    useEffect(() => {
        getProduct()
        getUserType()
        userLoginControl()
    }, [])

    const userLoginControl = async () => {
        let token = localStorage.getItem('token')
        if (token) {
            let user = await authValidation(token)
            if (user) {
                setuserControl(user)
            } else {
                setuserControl(false)
            }
        } else {
            setuserControl(false)
        }
    }

    const getUserType = () => {
        const usr = localStorage.getItem('user')
        if (usr) {
            const usrObj = JSON.parse(usr)
            if (usrObj.id[0] === '1') {
                setUserType('customer')
            } else if (usrObj.id[0] === '2') {
                setUserType('company')
            } else {
                setUserType('')
            }
        }
    }

    const toastMessage = (title: string, message: string, statusType: any = 'error', durationValue: number = 9000, positionValue: any = 'top-right') => {
        toast({
            title: title,
            description: message,
            position: positionValue,
            status: statusType,
            duration: durationValue,
            isClosable: true,
        })
    }

    const productBuy = (product: any) => {
        let productList:any = []
        productList.push(product)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token'),
                product: productList
            }),
        }
        fetch(`${config.api_url}/api/${userType}/product-buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.message == 'success') {
                    toastMessage('Success', 'You have successfully buy product', 'success', 3000, 'bottom-right')
                }
            })
    }

    const addToBasket = (product: any) => {
        let tmpList = localStorage.getItem('basketList')
        if (tmpList) {
            let basketList = JSON.parse(tmpList)
            basketList.push(product)
            localStorage.setItem('basketList', JSON.stringify(basketList))
        } else {
            let basketList = []
            basketList.push(product)
            localStorage.setItem('basketList', JSON.stringify(basketList))
        }
    }

    const getProduct = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        };
        fetch(`${config.api_url}/api/product/?id=${id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProduct(data)
                let tmp = data.comments
                setComments(tmp)
                setLoading(true)
            })
    }


    return (
        <Box>
            <Skeleton isLoaded={loading}  >
                {
                    userControl ? <UserNavBar /> : <NavBar />
                }
                <HStack>
                    <VStack
                        h={'91vh'}
                        w={'50%'}
                    >
                        <Image h={'100vh'} src={product.image} alt="product" />
                    </VStack>
                    <Box
                        padding={'5%'}
                        width={'50%'}
                    >
                        <Box
                            textAlign={'start'}
                        >
                            <Text
                                fontSize={'4xl'}
                                backgroundColor={'black'}
                                color={'white'}
                                padding={'2'}
                                display={'inline'}
                            >
                                {product.category}
                            </Text>
                            <Text
                                fontSize={'3xl'}
                                color={'gray.600'}
                                paddingTop={'2'}
                            >
                                {product.name}
                            </Text>
                            <Text
                                fontSize={'4xl'}
                                paddingTop={'2'}
                            >
                                £{product.price}
                            </Text>
                        </Box>
                        <Box
                            overflow={'auto'}
                            height={'30vh'}
                        >
                            <Text
                                fontSize={'xl'}
                                color={'gray.600'}
                                paddingTop={'2'}
                                textAlign={'justify'}
                            >
                                {product.description}
                            </Text>
                        </Box>
                        {comments.length > 0 ? <Text>Comments ({comments.length})</Text> : null}
                        <Box
                            overflow={'auto'}
                            height={'5vh'}
                            padding={'2'}
                        >
                            {
                                comments && comments.map((comment: any) => {
                                    return (
                                        <Box
                                            key={comment.id}
                                            backgroundColor={'white.100'}
                                            padding={'2'}
                                            shadow={'md'}
                                        >
                                            <Text
                                                fontSize={'xl'}
                                                color={'gray.600'}
                                            >
                                                {comment.name} {comment.surname}
                                            </Text>
                                            <Text>
                                                {comment.description}
                                            </Text>
                                        </Box>
                                    )
                                }
                                )
                            }
                        </Box>
                        <HStack
                            justifyContent={'center'}
                            marginTop={'10'}
                        >
                            <Button
                                fontSize={'2xl'}
                                colorScheme={'green'}
                                variant='solid'
                                margin={2}
                                padding={'5'}
                                onClick={() => productBuy(product)}
                            >Buy
                            </Button>
                            <Button
                                fontSize={'2xl'}
                                colorScheme={'cyan'}
                                variant='outline'
                                margin={2}
                                padding={'5'}
                                onClick={() => addToBasket(product)}
                            >add to Basket
                            </Button>
                        </HStack>
                    </Box>
                </HStack>
            </Skeleton>
        </Box>
    )
}

export default Detail