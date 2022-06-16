import React from 'react'
import { HStack, Box, Text, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

type Props = {}

const NavBar = (props: Props) => {
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
                <Button
                    colorScheme={'blue'}
                    variant="outline"
                >Login
                </Button>
                <Button
                    colorScheme={'pink'}
                    variant="outline"
                >Register
                </Button>
            </HStack>

        </Box>
    )
}

export default NavBar