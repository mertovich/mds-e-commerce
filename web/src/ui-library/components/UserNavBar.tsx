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
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdShoppingBasket } from "react-icons/md"

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
    const [user, setUser] = useState<User>({} as User)
    const [addProductControl, setAddProductcontrol] = useState<boolean>(true)
    const { isOpen, onOpen, onClose } = useDisclosure()

    const navigate = useNavigate()
    const btnRef = React.useRef(null)

    useEffect(() => {
        getUser()

    }, [])

    const getUser = async () => {
        const usr = localStorage.getItem('user')
        if (usr) {
            const usrObj: User = JSON.parse(usr)
            setUser(usrObj)
            await getUserType()
        }
    }

    const getUserType = () => {
        const usr = localStorage.getItem('user')
        if (usr) {
            const usrObj: User = JSON.parse(usr)
            if (usrObj.id[0] === '1' ) {
                setAddProductcontrol(true)
            } else if (usrObj.id[0] === '2') {
                setAddProductcontrol(false)
            } else {
                setAddProductcontrol(true)
            }
        }
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
                            <MenuItem>Table</MenuItem>
                            <MenuItem>Chair</MenuItem>
                            <MenuItem>Seat</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Kitchen</MenuButton>
                        <MenuList>
                            <MenuItem>Kitchen cupboard</MenuItem>
                            <MenuItem>Kitchen countertops</MenuItem>
                            <MenuItem>Dinner table</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Garden</MenuButton>
                        <MenuList>
                            <MenuItem>Garden armchair</MenuItem>
                            <MenuItem>Garden table</MenuItem>
                            <MenuItem>Garden accessory</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
            <HStack>
                <Button ref={btnRef} onClick={onOpen} leftIcon={<MdShoppingBasket />} colorScheme='blue' variant='solid'>
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
                            {/* basketList */}
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                colorScheme={'green'}
                                variant='solid'
                                margin={2}
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