import React from 'react'
import { HStack, Box, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
type Props = {}

const NavBar = (props: Props) => {
    const navigate = useNavigate()

    const navigateHendler = (path: string) => {
        navigate(path)
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
                    onClick={() => navigateHendler('/')}
                >MDS Store</Text>
            </HStack>
            <HStack>
                <Box 
                    padding={2}
                >
                <Menu>
                        <MenuButton 
                            onClick={() => navigateHendler('/')}
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
                <Button
                    colorScheme={'blue'}
                    variant="outline"
                    onClick={() => navigateHendler('/login') }
                >Login
                </Button>
                <Button
                    colorScheme={'pink'}
                    variant="outline"
                    onClick={() => navigateHendler('/register') }
                >Register
                </Button>
            </HStack>

        </Box>
    )
}

export default NavBar