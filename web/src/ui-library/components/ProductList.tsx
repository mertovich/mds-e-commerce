import {
    Box,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    SimpleGrid,
    Image,
    Text,
    Button,
    Spinner,
    useToast,
    VStack,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
    ProductsCategory: string
}

const ProductList: React.FC<IProps> = ({ ProductsCategory }) => {

    const [Loaded, setLoaded] = useState<boolean>(true)
    const [User, SetUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [Products, setProducts] = useState<any[]>([])
    const [userType, setUserType] = useState<string>('customer')
    const [searchControl, setSearchControl] = useState<boolean>(false)
    const [searchResult, setSearchResult] = useState<any[]>([])

    const toast = useToast()
    const config = require('../../config.json')
    const navigate = useNavigate()

    const productNavigate = (id: string) => {
        navigate(`/product/${id}`)
    }

    const searchHandler = (text: string) => {
        if (text !== '') {
            setSearchControl(true)
            let tmpList = Products.filter((product: any) => {
                return product.name.toLowerCase().includes(text.toLowerCase())
            })
            setSearchResult(tmpList)
        } else {
            setSearchControl(false)
            setSearchResult(Products)
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

    useEffect(() => {
        getProductsList()
        getUserType()
    }, [])

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

    const getProductsList = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }
        fetch(`${config.api_url}/api/products`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (ProductsCategory === 'all') {
                    setProducts(data)
                    setSearchResult(data)
                } else {
                    let category = ProductsCategory.toLowerCase().replaceAll('-', ' ')
                    let tmpList: any = []
                    data.forEach((product: any) => {
                        if (product.category === category) {
                            tmpList.push(product)
                        }
                    });
                    setProducts(tmpList)
                    setSearchResult(tmpList)
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
        toastMessage('Success', 'Product added to basket', 'success', 3000, 'top-right')
    }

    const productBuy = (product: any) => {
        let productList: any = []
        productList.push(product)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: User.id,
                token: localStorage.getItem('token'),
                product: productList
            }),
        }
        fetch(`${config.api_url}/api/${userType}/product-buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'success') {
                    toastMessage('Success', 'You have successfully buy product', 'success', 3000, 'bottom-right')
                }
            })
    }
    return (
        <Box>
            <Stack
                width="25%"
                margin="auto"
            >
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        zIndex={0}
                        children={<SearchIcon color='gray.400' />}
                    />
                    <Input onChange={(e) => searchHandler(e.target.value)} type='text' placeholder='Search' />
                </InputGroup>
            </Stack>
            {
                Loaded ?
                    <SimpleGrid
                        spacing='1%'
                        minChildWidth='300px'
                        marginTop='3%'
                        marginBottom='3%'
                        marginLeft='1%'
                        marginRight='1%'
                    >
                        {searchResult.map((p: any, i) => (
                            <VStack
                                key={i}
                                shadow='xl'
                                marginTop={'10%'}
                            >
                                <Image
                                    src={p.image}
                                    alt={p.name}
                                    display='block'
                                    margin={'auto'}
                                    height='200px'

                                />
                                <Text
                                    paddingLeft={'5%'}
                                    paddingRight={'5%'}
                                >
                                    {p.name.toUpperCase().slice(0, 150)} {p.name.length > 150 ? '...' : ''}
                                </Text>
                                <Text
                                    fontSize='md'
                                    fontWeight='bold'
                                >
                                    £{p.price}
                                </Text>
                                <Button
                                    onClick={() => productBuy(p)}
                                    colorScheme='green'
                                    variant='solid'
                                    width={'100%'}
                                >
                                    Buy
                                </Button>
                                <Button
                                    onClick={() => addToBasket(p)}
                                    colorScheme='blue'
                                    variant='outline'
                                    width={'100%'}
                                >
                                    Add to Basket
                                </Button>
                                <Button
                                    onClick={() => productNavigate(p.id)}
                                    colorScheme='orange'
                                    variant='outline'
                                    width={'100%'}
                                >
                                    Detail
                                </Button>

                            </VStack>
                        ))}
                    </SimpleGrid>
                    :
                    <Box
                        textAlign={'center'}
                        marginTop={'5%'}
                    >
                        <Spinner
                            thickness='4px'
                            speed='0.65s'
                            emptyColor='gray.200'
                            color='blue.500'
                            size='xl'
                        />
                    </Box>
            }
        </Box>
    )
}

export default ProductList