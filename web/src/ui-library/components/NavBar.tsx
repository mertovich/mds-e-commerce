import React from 'react'
import { HStack, Box, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
type Props = {}

const NavBar = (props: Props) => {
    const navigate = useNavigate()

    const navigateHendler = (path: string) => {
        navigate(path)
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
                            <MenuItem onClick={() => navigateHendler('/products/Table')} >Table</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Chair')}>Chair</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Seat')}>Seat</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Kitchen</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateHendler('/products/Kitchen-cupboard')}>Kitchen cupboard</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Kitchen-countertops')}>Kitchen countertops</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Dinner-table')}>Dinner table</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
                <Box
                    padding={2}
                >
                    <Menu>
                        <MenuButton>Garden</MenuButton>
                        <MenuList>
                            <MenuItem onClick={() => navigateHendler('/products/Garden-armchair')}>Garden armchair</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Garden-table')}>Garden table</MenuItem>
                            <MenuItem onClick={() => navigateHendler('/products/Garden-accessory')}>Garden accessory</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
            <HStack>
                <Button
                    colorScheme={'blue'}
                    variant="outline"
                    onClick={() => navigateHendler('/login')}
                >Login
                </Button>
                <Button
                    colorScheme={'pink'}
                    variant="outline"
                    onClick={() => navigateHendler('/register')}
                >Register
                </Button>
            </HStack>

        </Box>
    )
}

export default NavBar