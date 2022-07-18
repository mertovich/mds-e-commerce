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
    useDisclosure,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogCloseButton,
} from '@chakra-ui/react'

type Props = {}

const MyProductList = (props: Props) => {
    const [user, setUser] = useState<any>(JSON.parse(localStorage.getItem('user') || '{}'))
    const [productList, setProductList] = useState<any>([])
    const [productId, setProductId] = useState<string>('')

    const config = require('../../config')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef(null)


    useEffect(() => {
        getProducts()
    }, [])

    const alertButtonHandler = (id: string) => {
        onOpen()
        setProductId(id)
    }

    const getProducts = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token')
            })
        };
        fetch(`${config.api_url}/api/company/product-list`, requestOptions)
            .then(response => response.json())
            .then(data => {
                setProductList(data)
            })
    }

    const deleteProduct = (id: string) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: id,
                id: user.id,
                token: localStorage.getItem('token')
            })
        };
        fetch(`${config.api_url}/api/product-remove`, requestOptions)
            .then(response => response.json())
            .then(data => {
                getProducts()
                console.log(data)
            })
    }

    return (
        <Box>
            <TableContainer>
                <Table variant={'striped'} colorScheme='blue'>
                    <TableCaption>My Product List</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Product Name</Th>
                            <Th>Created at</Th>
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
                                            {`${(item.name).slice(0, 20)}...`}
                                        </Tooltip>
                                    </Td>
                                    <Td>{item.created_at.slice(0, 10)}</Td>
                                    <Td isNumeric>{`£${item.price}`}</Td>
                                    <Td
                                        textAlign={'center'}
                                    >
                                        <Button
                                            size={'sm'}
                                            onClick={() => alertButtonHandler(item.id)}
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
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>Delete product</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {`Are you sure you want to delete the product ?`}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button
                            colorScheme='red' ml={3}
                            onClick={() => {
                                deleteProduct(productId)
                                onClose()
                            }}
                        >
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Box >
    )
}

export default MyProductList