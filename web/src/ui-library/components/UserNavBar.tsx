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
            console.log(user.name)
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
                >MDS Store</Text>
            </HStack>
            <HStack>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Category</MenuButton>
                        <MenuList>
                            <MenuItem>Category 1</MenuItem>
                            <MenuItem>Category 2</MenuItem>
                            <MenuItem>Category 3</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Category</MenuButton>
                        <MenuList>
                            <MenuItem>Category 1</MenuItem>
                            <MenuItem>Category 2</MenuItem>
                            <MenuItem>Category 3</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Category</MenuButton>
                        <MenuList>
                            <MenuItem>Category 1</MenuItem>
                            <MenuItem>Category 2</MenuItem>
                            <MenuItem>Category 3</MenuItem>
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