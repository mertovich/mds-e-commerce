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
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'

type Props = {}

const ProductList = (props: Props) => {
    const [Loaded, setLoaded] = useState<boolean>(true)

    const [Products, setProducts] = useState<any[]>([])

    useEffect(() => {
        getProductsList()
    }, [])

    const getProductsList = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({}),
        }
        fetch('http://localhost:8080/api/products', requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data)
                console.log(data)
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
                    <Input type='text' placeholder='Search' />
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
                        {Products.map((p:any, i) => (
                            <Box
                                bgColor={'gray.200'}
                                borderRadius={'10px'}
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
                                    >Buy
                                    </Button>
                                    <Button
                                        colorScheme={'cyan'}
                                        variant='outline'
                                        margin={2}
                                        onClick={() => addToBasket(p)}
                                    >add to Basket
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