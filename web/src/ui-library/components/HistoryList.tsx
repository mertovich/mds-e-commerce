import {
    Box,
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

type Props = {}

const HistoryList = (props: Props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [history, setHistory] = useState([])

    useEffect(() => {
        getPurchaseHistory()
    }, [])


    const getPurchaseHistory = async () => {
        let userType = ''
        if(user.id[0] === '1'){
            userType = 'customer'
        } else if(user.id[0] === '2'){
            userType = 'company'
        }

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token')
            })
        };
        fetch(`http://localhost:8080/api/${userType}/purchase-history`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setHistory(data.purchase_history)
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
                        </Tr>
                    </Thead>
                    <Tbody>
                        {history.map((item: any, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.seller}</Td>
                                    <Td isNumeric>{item.price}</Td>
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

export default HistoryList