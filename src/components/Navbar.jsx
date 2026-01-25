import { useState } from "react";
import {Box, Flex, Text, IconButton, Drawer, Portal, CloseButton, Image} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Search from './Search';
import logo from '../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import UserProfileButton from "./UserProfileButton";

const Links = [
    { label: 'Home', path: '/' },
    { label: 'Exhibitions', path: '/exhibitions' },
    { label: 'About', path: '/about' },
];

export default function Navbar({ onSearch, initialSearch }) {
    const [open, setOpen] = useState(false);

    return (
        <Box
            as="nav"
            position="sticky"
            bg="white"
            
            borderBottom="1px solid"
            borderColor="gray.200"
            top={0}
            px="3rem"
            zIndex="1000">

            <Flex h={16} alignItems="center" justifyContent="space-between">
                <RouterLink to="/" aria-label="Go to homepage">
                    <Image
                        src={logo}
                        alt="Logo"
                        boxSize={{ base: "70px", md: "90px", lg: "90px" }} 
                        objectFit="contain" 
                    />
                </RouterLink>

                {/* Desktop Links */}
                <Flex as="ul" gap={{ base: 4, md: 5, lg: 6 }} align="center" display={{ base: 'none', md: 'flex' }}>
                    {Links.map(({ label, path }) => (
                        <Box as="li" key={label} listStyleType="none">
                            <Text
                                as={RouterLink}
                                to={path}
                                color={location.pathname === path ? "maroon" : "black"}
                                fontWeight="medium"
                                letterSpacing={0.5}
                                fontSize={{ base: "16px", md: "17px", lg: "17px" }}
                                fontFamily="Inter, sans-serif"
                                _hover={{ textDecoration: 'underline', color: 'maroon' }}
                            >
                                {label}
                            </Text>
                        </Box>
                    ))}
                    
                    <Box maxW={{ md: "200px", lg: "350px" }}>
                        <Search onSearch={onSearch} />
                    </Box>

                    {/* login */}
                    <UserProfileButton />
                </Flex>

                {/* Mobile Menu Button */}
                <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <Drawer.Trigger asChild>
                        <IconButton
                            bg="white"
                            aria-label="Open menu"
                            display={{ base: "flex", md: "none" }}
                            onClick={() => setOpen(true)}
                            variant="ghost"
                            fontSize="24px"
                        >
                            <FiMenu />
                        </IconButton>
                    </Drawer.Trigger>

                    <Portal>
                        <Drawer.Backdrop />
                        <Drawer.Positioner>
                            <Drawer.Content
                                bg="white"
                                w="80vw"
                                maxW="300px"
                                boxShadow="lg"
                                p={8}
                                display="flex"
                                flexDirection="column"
                                position="relative"
                                role='dialog'
                                aria-label='Mobile navigation'
                            >
                                <Drawer.CloseTrigger asChild>
                                    <CloseButton
                                        aria-label="Close menu"
                                        bg="white"
                                        size="sm"
                                    />
                                </Drawer.CloseTrigger>

                                <Box as="ul" mt={12} display="flex" flexDirection="column" gap={6}>
                                    {Links.map(({ label, path }) => (
                                        <Box as="li" key={label} listStyleType="none">
                                            <Text
                                                as={RouterLink}
                                                to={path}
                                                onClick={() => setOpen(false)}
                                                fontSize="sm"
                                                fontWeight="semibold"
                                                color="black"
                                                _hover={{ color: 'maroon' }}
                                            >
                                                {label}
                                            </Text>
                                        </Box>
                                    ))}
                                        <UserProfileButton setMobileNavbarOpen={setOpen}/>
                                </Box>

                                {/* Search */}
                                <Box mt={10}>
                                    <Search
                                        onSearch={onSearch}
                                        onFinish={() => setOpen(false)}
                                        initialSearch={initialSearch}
                                    />
                                </Box>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Flex>
        </Box>
    );
}
