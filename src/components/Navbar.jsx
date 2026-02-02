import { useEffect, useState } from "react";
import { Box, Flex, Text, IconButton, Icon, Drawer, Portal, CloseButton, Image } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import logo from '../assets/logo.png';
import { Link as RouterLink } from 'react-router-dom';
import UserProfileButton from "./UserProfileButton";
import { LuSearch } from "react-icons/lu";
import SearchDrawer from "./SearchDrawer";


const Links = [
    { label: 'Home', path: '/' },
    { label: 'Exhibitions', path: '/exhibitions' },
    { label: 'About', path: '/about' },
];

export default function Navbar({ onSearch, initialSearch }) {
    const [open, setOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const controlNavbar = () => {
            let currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 250) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            lastScrollY = currentScrollY;
        }
        window.addEventListener("scroll", controlNavbar)

        return () => window.removeEventListener("scroll", controlNavbar)
    }, [])


    return (
        <>
            <Box
                as="nav"
                position="sticky"
                bg="white"
                borderBottom="1px solid"
                borderColor="gray.200"
                top={0}
                px={{ base: "1rem", md: "2rem" }}
                transition="transform 0.3s ease"
                transform={isVisible ? "translateY(0)" : "translateY(-100%)"}
                opacity={isVisible ? 1 : 0}
            >
                <Flex h={16} alignItems="center" justifyContent="space-between">
                    <Flex align="center" gap={1}>
                        {/* Mobile Menu Button */}
                        <Drawer.Root
                            placement="left"
                            open={open}
                            onOpenChange={(e) => setOpen(e.open)}
                        >
                            <Drawer.Trigger asChild>
                                <IconButton
                                    color="black"
                                    bg="white"
                                    aria-label="Open menu"
                                    display={{ base: "flex", md: "none" }}
                                    onClick={() => setMenuOpen(true)}
                                    variant="ghost"
                                >
                                    <Icon as={FiMenu} boxSize={7} />
                                </IconButton>
                            </Drawer.Trigger>
                            <Portal>
                                <Drawer.Backdrop />
                                <Drawer.Positioner>
                                    <Drawer.Content
                                        bg="white"
                                        h="100vh"
                                        w="80vw"
                                        maxW="300px"
                                        boxShadow="lg"
                                        pt={6}
                                        px={6}
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
                                            <Box>
                                                <UserProfileButton setMobileNavbarOpen={setOpen} />
                                            </Box>
                                        </Box>
                                    </Drawer.Content>
                                </Drawer.Positioner>
                            </Portal>
                        </Drawer.Root>
                        <RouterLink to="/" aria-label="Go to homepage">

                            {/* Logo */}
                            <Image
                                src={logo}
                                alt="Logo"
                                boxSize={{ base: "70px", md: "90px", lg: "90px" }}
                                objectFit="contain"
                            />
                        </RouterLink>
                    </Flex>

                    {/* Mobile Search Icon */}
                    <IconButton
                        aria-label="Search"
                        color="black"
                        bg="white"
                        size="sm"
                        display={{ base: "flex", md: "none" }}
                        onClick={() => setSearchOpen(true)}
                    >
                        <Icon as={LuSearch} boxSize={6} />
                    </IconButton>

                    {/* Desktop Links */}
                    <Flex
                        as="ul"
                        gap={8}
                        align="center"
                        display={{ base: 'none', md: 'flex' }}
                    >
                        {Links.map(({ label, path }) => (
                            <Box as="li" key={label} listStyleType="none" >
                                <Text
                                    as={RouterLink}
                                    to={path}
                                    color={location.pathname === path ? "maroon" : "black"}
                                    fontWeight="normal"
                                    letterSpacing={0.5}
                                    fontSize={{ base: "16px", md: "17px", lg: "17px" }}
                                    _hover={{ textDecoration: 'underline', color: 'maroon' }}
                                >
                                    {label}
                                </Text>
                            </Box>
                        ))}

                        {/* Desktop search */}
                        <Box as="li" listStyleType="none" >
                            <IconButton
                                aria-label="Search"
                                size="sm"
                                color="black"
                                bg="white"
                                onClick={() => setSearchOpen(true)}
                            >
                                <LuSearch />
                            </IconButton>
                        </Box>

                        <SearchDrawer
                            open={searchOpen}
                            setOpen={setSearchOpen}
                            onSearch={onSearch}
                            initialSearch={initialSearch}
                        />

                        {/* login */}
                        <Box as="li" listStyleType="none" >
                            <UserProfileButton />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
