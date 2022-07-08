import {
    Box,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    SimpleGrid,
    Image,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    HStack,
    Button,
    Spinner,
    useToast
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface IProps {
    ProductsCategory: string
}

const ProductList:React.FC<IProps> = ({ProductsCategory}) => {

    const [Loaded, setLoaded] = useState<boolean>(true)
    const [User,SetUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
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
        if(text !== '') {
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
                    let tmpList:any = []
                    data.forEach((product:any) => {
                        if(product.category === category) {
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

    const productBuy = (product: any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: User.id,
                token: localStorage.getItem('token'),
                product: product
            }),
        }
        fetch(`${config.api_url}/api/${userType}/product-buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if(data.message === 'success') {
                    toastMessage('Success', 'You have successfully buy product', 'success', 3000,'bottom-right')
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
                        paddingTop={'3%'}
                        paddingBottom={'5%'}
                        paddingLeft={'3%'}
                        paddingRight={'3%'}
                    >
                        {searchResult.map((p:any, i) => (
                            <Box
                                bgColor={'gray.200'}
                                borderRadius={'10px'}
                                key={i}
                            >
                                <Box
                                    width={'100%'}
                                    bgColor={'blackAlpha.100'}
                                >
                                    <Image src={p.image} height={'300px'} />
                                </Box>
                                <Text
                                    fontSize={'xl'}
                                    textAlign={'center'}
                                    padding={5}
                                >{p.name}
                                </Text>
                                <Stat
                                    textAlign={'center'}
                                >
                                    <StatLabel>{p.seller}</StatLabel>
                                    <StatNumber>£{p.price}</StatNumber>
                                </Stat>
                                <HStack
                                    justifyContent={'center'}
                                >
                                    <Button
                                        colorScheme={'green'}
                                        variant='solid'
                                        margin={2}
                                        onClick={() => productBuy(p)}
                                    >Buy
                                    </Button>
                                    <Button
                                        colorScheme={'cyan'}
                                        variant='outline'
                                        margin={2}
                                        onClick={() => addToBasket(p)}
                                    >add to Basket
                                    </Button>
                                    <Button
                                        colorScheme={'yellow'}
                                        variant='outline'
                                        margin={2}
                                        onClick={() => productNavigate(p.id)}
                                    >
                                        Details
                                    </Button>
                                </HStack>
                            </Box>
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