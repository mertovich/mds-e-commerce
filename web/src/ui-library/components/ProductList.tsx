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
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'

type Props = {}

const ProductList = (props: Props) => {
    const [Loaded, setLoaded] = useState<boolean>(false)

    return (
        <Box>
                <Stack
                    width="25%"
                    margin="auto"
                >
                    <InputGroup>
                        <InputLeftElement
                            pointerEvents='none'
                            children={<SearchIcon color='gray.400' />}
                        />
                        <Input type='tel' placeholder='Search' />
                    </InputGroup>
                </Stack>
                <SimpleGrid
                    spacing='1%'
                    minChildWidth='300px'
                    paddingTop={'3%'}
                    paddingBottom={'5%'}
                    paddingLeft={'3%'}
                    paddingRight={'3%'}
                >
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Box
                            bgColor={'gray.200'}
                            borderRadius={'10px'}
                        >
                            <Box
                                width={'100%'}
                                bgColor={'blackAlpha.100'}
                            >
                                <Image src='https://www.pngmart.com/files/21/Accent-Chair-PNG-Photos.png' height={'300px'} />
                            </Box>
                            <Text
                                fontSize={'xl'}
                                textAlign={'center'}
                                padding={5}
                            >Chair Model X
                            </Text>
                            <Stat
                                textAlign={'center'}
                            >
                                <StatLabel>selle name</StatLabel>
                                <StatNumber>£0.00</StatNumber>
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
                                >add to Basket
                                </Button>
                            </HStack>
                        </Box>
                    ))}
                </SimpleGrid>
        </Box>
    )
}

export default ProductList