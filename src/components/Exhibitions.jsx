import { useState } from "react"
import { SimpleGrid, Button, CloseButton, Dialog, Portal, Input, Stack, Box, Text, Badge, Card, HStack, Image, Flex } from "@chakra-ui/react"
import { createExhibition, getAllExhibitions, getExhibitionImage } from "@/utils/Exhibitions";

export default function Exhibitions() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");


    function handleCreate() {
        if (!name.trim()) return;
        createExhibition(name, description);
        setName("");
        setDescription("");
    }


    return (
        <>
            <Box
                as="nav"
                position="sticky"
                bg="white"
                px={4}
                top={0}
                zIndex="1000"
            >
                <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
                    <Flex justify="space-between" align="center" mt={10}>

                        <Text fontSize="xl" fontWeight="bold">EXHIBITIONS</Text>
                        <Dialog.Trigger asChild>
                            <Button px={6} display="flex" bg="white" variant="outline">Create Exhibition</Button>
                        </Dialog.Trigger>
                    </Flex>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content >
                                <Dialog.Header>
                                    <Dialog.Title color="maroon">Create Exhibition</Dialog.Title>
                                </Dialog.Header>
                                <Dialog.Body>
                                    <Stack gap="4">
                                        <Input
                                            px={4}
                                            placeholder="Exhibition name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <Input
                                            p={12}
                                            px={4}
                                            textAlign="start"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Stack>
                                </Dialog.Body>
                                <Dialog.Footer>
                                    <Dialog.ActionTrigger asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </Dialog.ActionTrigger>
                                    <Button bg="maroon" onClick={handleCreate}>Create</Button>
                                </Dialog.Footer>
                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" />
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Box>

            <SimpleGrid
                columns={{ base: 1, md: 2 }}
                spacing={6}
                px={4}
                py={6}
            >
                {getAllExhibitions().map((exb) => {
                    const imageUrl = getExhibitionImage(exb.name)

                    return (
                        <Card.Root
                            key={exb.name}
                            display="flex"
                            flexDirection="column"
                            overflow="hidden"
                            height="100%"
                            maxW="xl"
                            w="100%"
                        >
                            {imageUrl && (
                                <Image
                                    objectFit="cover"
                                    w="100%"
                                    h="250px"
                                    src={imageUrl}
                                    alt={`${exb.name} cover`}
                                />
                            )}

                            <Box flex="1" display="flex" flexDirection="column" p={4}>
                                <Card.Body flex="1">
                                    <Card.Title mt={2} fontWeight="bold" mb={2}>{exb.name}</Card.Title>
                                    <Card.Description>{exb.description}</Card.Description>
                                    <HStack mt={4}>
                                        <Badge fontSize="sm">{exb.artworks.length}</Badge>
                                    </HStack>
                                </Card.Body>

                                <Card.Footer mt="auto" display="flex" justifyContent="space-between">
                                    <Button bg="maroon" fontSize="xs" letterSpacing={0.5} color="white">
                                        DELETE
                                    </Button>
                                    <Button fontSize="xs" letterSpacing={0.5} color="black">
                                        RENAME
                                    </Button>
                                </Card.Footer>
                            </Box>
                        </Card.Root>
                    )
                })}
            </SimpleGrid>

        </>
    )
}
