import {
    Box,
    HStack,
    Text,
    Menu,
    MenuItem,
    MenuButton,
    MenuList,
    Avatar,
    MenuGroup,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Image,
    useToast,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdShoppingBasket } from "react-icons/md"
import { CloseIcon, Icon } from '@chakra-ui/icons'

type Props = {}

interface User {
    createdAt: string
    email: string
    id: string
    name: string
    surname: string
    password: string
    exp: number
}


const UserNavBar = (props: Props) => {
    const [user, setUser] = useState<User>(JSON.parse(localStorage.getItem('user') || '{}'))
    const [addProductControl, setAddProductcontrol] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [basketList, setBasketList] = useState<object[]>([])
    const [userType, setUserType] = useState<string>('customer')

    const navigate = useNavigate()
    const btnRef = React.useRef(null)
    const toast = useToast()
    const config = require('../../config.json')

    useEffect(() => {
        getUserType()
    }, [])

    const navigateHandler = (path: string) => {
        navigate(path)
        window.location.reload()
    }

    const deleteAllItem = () => {
        setBasketList([])
        localStorage.setItem('basketList', JSON.stringify([]))
    }

    const removeBasketItem = (index: number) => {
        const newBasketList = basketList.filter((item, i) => i !== index)
        setBasketList(newBasketList)
        localStorage.setItem('basketList', JSON.stringify(newBasketList))
    }

    const getBasketList = () => {
        onOpen()
        let tmpList = localStorage.getItem('basketList')
        if (tmpList) {
            setBasketList(JSON.parse(tmpList))
        }
    }

    const getUserType = () => {
        const usr = localStorage.getItem('user')
        if (usr) {
            const usrObj: User = JSON.parse(usr)
            if (usrObj.id[0] === '1') {
                setAddProductcontrol(true)
                setUserType('customer')
            } else if (usrObj.id[0] === '2') {
                setAddProductcontrol(false)
                setUserType('company')
            } else {
                setAddProductcontrol(true)
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

    const productBuy = (products: any) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: user.id,
                token: localStorage.getItem('token'),
                product: products
            }),
        }
        fetch(`${config.api_url}/api/${userType}/product-buy`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.message === 'success') {
                    toastMessage('Success', 'You have successfully buy product', 'success', 3000, 'bottom-right')
                    deleteAllItem()
                    onClose()
                }
            })
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/')
        window.location.reload()
    }

    const gotoSettings = () => {
        navigate('/settings')
    }

    const gotoPurchaseHistory = () => {
        navigate('/purchase-history')
    }

    const gotoHome = () => {
        navigate('/')
    }

    const goToAddProduct = () => {
        navigate('/product-add')
    }

    const goToMyProductList = () => {
        navigate('/my-products')
    }

    return (
        <Box
            as="nav"
            padding={4}
            justifyContent="space-between"
            display={'flex'}
        >
            <HStack>
                <Text
                    color={'blue.500'}
                    fontWeight={'bold'}
                    onClick={() => gotoHome()}
                >MDS Store</Text>
            </HStack>
            <HStack>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton
                            onClick={() => gotoHome()}
                        >Home</MenuButton>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>living room</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateHandler('/products/Table')} >Table</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Chair')}>Chair</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Seat')}>Seat</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Kitchen</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateHandler('/products/Kitchen-cupboard')}>Kitchen cupboard</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Kitchen-countertops')}>Kitchen countertops</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Dinner-table')}>Dinner table</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Garden</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateHandler('/products/Garden-armchair')}>Garden armchair</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Garden-table')}>Garden table</MenuItem>
                            <MenuItem onClick={() => navigateHandler('/products/Garden-accessory')}>Garden accessory</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
            <HStack>
                <Button
                    ref={btnRef}
                    onClick={() => getBasketList()}
                    leftIcon={<MdShoppingBasket />}
                    colorScheme='blue' variant='solid'
                >
                    Basket
                </Button>
                <Modal
                    onClose={onClose}
                    finalFocusRef={btnRef}
                    isOpen={isOpen}
                    scrollBehavior='inside'
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Basket</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {basketList.map((item: any, index) => (
                                <Box key={index}>
                                    <HStack>
                                        <Image
                                            src={item.image}
                                            alt='product image'
                                            width={100}
                                        />
                                        <Text
                                            textAlign={'justify'}
                                        >
                                            {item.name}
                                        </Text>
                                        <Button
                                            onClick={() => removeBasketItem(index)}
                                            size={'sm'}
                                            colorScheme='red'
                                            variant='solid'
                                            height={100}
                                        >
                                            <Icon
                                                as={CloseIcon} />
                                        </Button>
                                    </HStack>
                                </Box>
                            ))}
                        </ModalBody>
                        <Text
                            fontSize={'xl'}
                            margin={2}
                        >
                            Total: £{basketList.reduce((acc: number, item: any) => acc + item.price, 0)}
                        </Text>
                        <ModalFooter>
                            <Button
                                colorScheme={'red'}
                                variant='solid'
                                margin={2}
                                onClick={() => deleteAllItem()}
                            >Delete All item
                            </Button>
                            <Button
                                colorScheme={'green'}
                                variant='solid'
                                margin={2}
                                onClick={() => productBuy(basketList)}
                            >Buy
                            </Button>
                            <Button onClick={onClose}>Close</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Menu>
                    <MenuButton>
                        <Avatar name={`${user.name} ${user.surname}`} src='https://bit.ly/tioluwani-kolawole' />
                    </MenuButton>
                    <MenuList>
                        <MenuGroup textAlign={'start'} title={`${user.name} ${user.surname}`} >
                            <MenuItem onClick={() => goToAddProduct()} hidden={addProductControl} >Add Product</MenuItem>
                            <MenuItem onClick={() => goToMyProductList()} hidden={addProductControl} >My Product List</MenuItem>
                            <MenuItem onClick={() => gotoPurchaseHistory()} >Purchase history</MenuItem>
                            <MenuItem onClick={() => gotoSettings()} >Settings</MenuItem>
                            <MenuItem onClick={() => logout()} >Logout</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </HStack>

        </Box>
    )
}

export default UserNavBar