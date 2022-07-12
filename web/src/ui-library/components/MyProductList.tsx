import React, { useEffect, useState } from 'react'
import {
    Box,
    Button,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tooltip,
} from '@chakra-ui/react'

type Props = {}

const MyProductList = (props: Props) => {
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'))
    const [productList, setProductList] = useState<any>([])
    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token')
            })
        };
        fetch('http://localhost:8080/api/company/product-list', requestOptions)
            .then(response => response.json())
            .then(data => {
                setProductList(data)
            })
    }

    return (
        <Box>
            <TableContainer>
                <Table variant={'striped'} colorScheme='blue'>
                    <TableCaption>Purchase History</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Product Name</Th>
                            <Th>Seller</Th>
                            <Th isNumeric>Price</Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {productList.map((item: any) => {
                            return (
                                <Tr key={item.id}>
                                    <Td>
                                        <Tooltip label={`${item.name}`}>
                                            {`${(item.name).slice(0,20)}...`}
                                        </Tooltip>
                                    </Td>
                                    <Td>{item.seller}</Td>
                                    <Td isNumeric>{item.price}</Td>
                                    <Td
                                        textAlign={'center'}
                                    >
                                        <Button
                                            size={'sm'}
                                            onClick={() => { }}
                                            colorScheme={"red"}
                                        >
                                            Delete
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        }
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default MyProductList