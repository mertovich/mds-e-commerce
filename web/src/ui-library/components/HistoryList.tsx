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
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Textarea,
    ModalFooter,
    useToast,
} from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'

type Props = {}

const HistoryList = (props: Props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'))
    const [history, setHistory] = useState([])
    const [comment, setComment] = useState<string>('')
    const [product, setProduct] = useState<any>({})

    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast()

    const config = require('../../config.json')

    useEffect(() => {
        getPurchaseHistory()
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

    const addCommentButton = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                product_id: product.id,
                comment: {
                    customer_id: user.id,
                    name: user.name,
                    surname: user.surname,
                    description: comment,
                }
            }),
        }
        fetch(`${config.api_url}/api/product-comment`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if(data.message === 'success'){
                    toastMessage('Success', 'Comment added successfully', 'success',3000,'bottom-right')
                    onClose()
                }
            }
            )
    }

    const addCommentAlert = (product:any) => {
        onOpen()
        setProduct(product)
    }

    const getPurchaseHistory = async () => {
        let userType = ''
        if (user.id[0] === '1') {
            userType = 'customer'
        } else if (user.id[0] === '2') {
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
        fetch(`${config.api_url}/api/${userType}/purchase-history`, requestOptions)
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
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {history.map((item: any, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>{item.name}</Td>
                                    <Td>{item.seller}</Td>
                                    <Td isNumeric>{`£${item.price}`}</Td>
                                    <Td
                                        textAlign={'center'}
                                    >
                                        <Button
                                            size={'sm'}
                                            onClick={() => addCommentAlert(item)}
                                            colorScheme={"orange"}
                                        >
                                            Add Comment
                                        </Button>
                                    </Td>
                                </Tr>
                            )
                        }
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create your comment</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl mt={4}>
                            <FormLabel>Comment</FormLabel>
                            <Textarea
                                placeholder='write your comment here'
                                onChange={(e) => setComment(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button 
                        colorScheme='blue' mr={3}
                        onClick={addCommentButton}
                        >
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default HistoryList