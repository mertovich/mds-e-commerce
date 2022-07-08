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

type Props = {}

const Detail = (props: Props) => {
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState<any>({})
    const [comments, setComments] = useState<any>([])
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))

    const { id } = useParams()
    const toast = useToast()
    const config = require('../config')

    useEffect(() => {
        getProduct()
    }, [])

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

    const productBuy = (product: any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token'),
                product: product
            }),
        }
        fetch(`${config.api_url}/api/customer/product-buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.message == 'success') {
                    toastMessage('Success', 'You have successfully buy product', 'success', 3000,'bottom-right')
                }
            })
    }

    const addToBasket = (product: any) => {
        let tmpList = localStorage.getItem('basketList')
        console.log(product)
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
                <UserNavBar />
                <HStack>
                    <VStack
                        h={'90vh'}
                        backgroundColor={'gray.400'}
                        w={'50%'}
                    >
                        <Image src={product.image} alt="product" />
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
                            height={'20vh'}
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
                        {
                            comments && comments.map((comment: any) => {
                                return (
                                    <Box
                                        key={comment.id}
                                        overflow={'auto'}
                                        height={'15vh'}
                                        backgroundColor={'gray.100'}
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