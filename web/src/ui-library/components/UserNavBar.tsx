import { Box, HStack, Text, Menu, MenuItem, MenuButton, MenuList, Avatar, MenuGroup } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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

    const navigate = useNavigate()

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
        window.location.reload()
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
                <Menu>
                <MenuButton>
                <Avatar name={`${user.name} ${user.surname}`} src='https://bit.ly/tioluwani-kolawole' />
                </MenuButton>
                <MenuList>
                    <MenuGroup>
                        <MenuItem>Profile</MenuItem>
                        <MenuItem>Settings</MenuItem>
                        <MenuItem onClick={() => logout()} >Logout</MenuItem>
                    </MenuGroup>
                </MenuList>
                </Menu>
            </HStack>

        </Box>
    )
}

export default UserNavBar