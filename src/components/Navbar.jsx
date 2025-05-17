import {
    Box,
    Flex,
    Text,
    IconButton,
    Drawer,
    Portal,
    CloseButton,
    DrawerTrigger,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
import Search from './Search';

const Links = ['Home', 'Artworks', 'Exhibitions', 'About'];

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box as="nav" bg="white" px={4} boxShadow="md" position="sticky" top={0} zIndex={10}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl" color="maroon">
                    LOGO
                </Text>

                {/* Desktop Links */}
                <Flex as="ul" gap={6} align="center" display={{ base: 'none', md: 'flex' }}>
                    {Links.map((link) => (
                        <Box as="li" key={link} listStyleType="none">
                            <Text key={link} fontWeight="medium" fontSize="lg" cursor="pointer" _hover={{ textDecoration: 'underline' }}>
                                {link}
                            </Text>
                        </Box>
                    ))}
                    <Box>
                        <Search />
                    </Box>
                </Flex>

                {/* Mobile Menu Button */}
                <Drawer.Root open={isOpen} onOpen={onOpen} onClose={onClose}>
                    <Drawer.Trigger asChild>
                        <IconButton
                            icon={<FiMenu />}
                            bg="white"
                            aria-label="Open menu"
                            display={{ base: "flex", md: "none" }}
                            onClick={onOpen}
                            variant="ghost"
                            fontSize="24px"
                        >
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
                                    <CloseButton aria-label="Close menu" bg="white" size="sm" />
                                </Drawer.CloseTrigger>

                                <Box as="ul" mt={12} display="flex" flexDirection="column" gap={6}>
                                    {Links.map((link) => (
                                        <Box as="li" key={link} listStyleType="none">
                                            <Text
                                                key={link}
                                                fontSize="xl"
                                                fontWeight="semibold"
                                                _hover={{ color: 'maroon', cursor: 'pointer' }}
                                            >
                                                {link}
                                            </Text>
                                        </Box>
                                    ))}
                                </Box>

                                <Box>
                                    <Search />
                                </Box>
                            </Drawer.Content>
                        </Drawer.Positioner>
                    </Portal>
                </Drawer.Root>
            </Flex>
        </Box>
    );
}
