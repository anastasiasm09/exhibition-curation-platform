import { useState } from "react";

import {
    Box,
    Flex,
    Text,
    IconButton,
    Drawer,
    Portal,
    CloseButton,
    Image,
} from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Search from './Search';
import logo from '../assets/logoArtworks.png';
import { Link as RouterLink } from 'react-router-dom';

const Links = [
    { label: 'Home', path: '/' },
    { label: 'Exhibitions', path: '/exhibitions' },
    { label: 'About', path: '/about' },
];

export default function Navbar({ onSearch }) {

    const [open, setOpen] = useState(false);


    return (
        <Box
            as="nav"
            position="sticky"
            bg="white"
            px={4}
            boxShadow="md"
            top={0}
            zIndex="1000">

            <Flex h={16} alignItems="center" justifyContent="space-between">
                <RouterLink to="/" aria-label="Go to homepage">
                    <Image
                        src={logo}
                        alt="Logo"
                        height="50px"
                    />
                </RouterLink>

                {/* Desktop Links */}
                <Flex as="ul" gap={6} align="center" display={{ base: 'none', md: 'flex' }}>
                    {Links.map(({ label, path }) => (
                        <Box as="li" key={label} listStyleType="none">
                            <Text
                                as={RouterLink}
                                to={path}
                                color="black"
                                fontWeight="medium"
                                letterSpacing={0.5}
                                fontSize="17px"
                                fontFamily="Inter, sans-serif"
                                _hover={{ textDecoration: 'underline', color: 'maroon' }}
                            >
                                {label}
                            </Text>
                        </Box>
                    ))}
                    <Box>
                        <Search onSearch={onSearch} />
                    </Box>
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
                                                fontSize="lg"
                                                fontWeight="semibold"
                                                color="black"
                                                _hover={{ color: 'maroon' }}
                                            >
                                                {label}
                                            </Text>
                                        </Box>
                                    ))}
                                </Box>

                                {/* Search */}
                                <Box mt={10}>
                                    <Search
                                        onSearch={onSearch}
                                        onFinish={() => setOpen(false)}
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
