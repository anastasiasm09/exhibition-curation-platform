import { useState } from "react"
import { Link } from 'react-router-dom'
import { SimpleGrid, Button, CloseButton, Dialog, Portal, Input, Stack, Box, Text, Badge, Card, HStack, Image, Flex, Field, Heading } from "@chakra-ui/react"
import { createExhibition, getAllExhibitions, getExhibitionImage, renameExhibition, deleteExhibition } from "@/utils/Exhibitions";

export default function Exhibitions() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [renameOpen, setRenameOpen] = useState(false);
    const [newName, setNewName] = useState("");
    const [exhibitionToRename, setExhibitionToRename] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [exhibitionToDelete, setExhibitionToDelete] = useState(null);
    const [isNameError, setIsNameError] = useState(false);


    const exhibitions = getAllExhibitions().sort((a, b) => a.date - b.date);


    function handleCreate() {
        if (!name.trim()) {
            setIsNameError(true);
            return;
        } else {
            setIsNameError(false);
            createExhibition(name, description);
            setOpen(false);
            setName("");
            setDescription("");
        }
    }

    function handleRename() {
        if (!newName.trim()) return;
        renameExhibition(exhibitionToRename, newName);
        setRenameOpen(false);
        setNewName("");
        setExhibitionToRename(null);
    }

    function handleDelete() {
        if (!exhibitionToDelete.trim()) return;
        deleteExhibition(exhibitionToDelete);
        setDeleteOpen(false)
        setExhibitionToDelete(null);
    }

    function handleErrorName(e) {
        setOpen(e.open)
        setIsNameError(false)
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
                <Dialog.Root
                    lazyMount open={open}
                    onOpenChange={handleErrorName}>
                    <Flex justify="space-between" align="center" mt={10}>

                        <Heading fontSize={{ base: "xs", md: "sm", lg: "2xl" }} letterSpacing={2} fontWeight="bold">EXHIBITIONS</Heading>
                        <Dialog.Trigger asChild>
                            <Button
                                px={{ base: 3, md: 6 }}
                                py={{ base: 2, md: 3 }}
                                fontSize={{ base: "xs", md: "sm" }}
                                bg="white"
                                color="maroon"
                                variant="outline"
                            >
                                Create Exhibition
                            </Button>
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
                                        <Field.Root invalid={isNameError}>
                                            <Input
                                                px={4}
                                                placeholder="Exhibition name"
                                                value={name}
                                                onChange={(e) => {
                                                    setName(e.target.value)
                                                    if (e.target.value.trim()) {
                                                        setIsNameError(false);
                                                    }
                                                }}
                                            />
                                            <Field.ErrorText>This field is required</Field.ErrorText>
                                        </Field.Root>
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

            {exhibitions.length === 0 ? (
                <Box px={4} py={6} display="flex" justifyContent="center" alignItems="center" minH="40vh">
                    <Text
                        fontSize="lg"
                        color="gray.500"
                        fontStyle="italic"
                        fontWeight="bold"
                        textAlign="center"
                        wordBreak="break-word"
                    >
                        You have not created any exhibitions yet.
                    </Text>
                </Box>
            ) : (
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={6}
                    mb={10}
                    px={4}
                    py={6}
                >
                    {getAllExhibitions().sort((a, b) => (a.date - b.date)).map((exb) => {
                        const imageUrl = getExhibitionImage(exb.name)

                        return (
                            <Stack>
                                <Card.Root
                                    key={exb.name}
                                    display="flex"
                                    flexDirection="column"
                                    overflow="hidden"
                                    height="100%"
                                    maxW="xl"
                                    w="100%"
                                    marginBottom={4}
                                >
                                    {imageUrl && (
                                        <Link to={`/exhibitions/${exb.name}`}>
                                            <Image
                                                objectFit="cover"
                                                w="100%"
                                                h="250px"
                                                src={imageUrl}
                                                alt={`${exb.name} cover`}
                                            />
                                        </Link>

                                    )}

                                    <Box flex="1" display="flex" flexDirection="column" p={4}>
                                        <Card.Body flex="1">
                                            <Link to={`/exhibitions/${exb.name}`}>
                                                <Card.Title color="maroon" mt={2} fontWeight="bold" mb={2}>{exb.name}</Card.Title>
                                            </Link>
                                            <Card.Description>{exb.description}</Card.Description>
                                            <HStack mt={4}>
                                                <Badge fontSize="sm">{exb.artworks.length}</Badge>
                                            </HStack>
                                        </Card.Body>

                                        <Card.Footer mt="auto" display="flex" justifyContent="space-between">
                                            <Button
                                                bg="maroon"
                                                fontSize="xs"
                                                letterSpacing={0.5}
                                                color="white"
                                                onClick={() => {
                                                    setDeleteOpen(true);
                                                    setExhibitionToDelete(exb.name)
                                                }}
                                            >
                                                DELETE
                                            </Button>
                                            <Button
                                                fontSize="xs"
                                                letterSpacing={0.5}
                                                color="black"
                                                bg="gray.100"
                                                onClick={() => {
                                                    setRenameOpen(true);
                                                    setExhibitionToRename(exb.name);
                                                }}
                                            >
                                                RENAME
                                            </Button>
                                        </Card.Footer>
                                    </Box>
                                </Card.Root>
                            </Stack>
                        )
                    })}
                </SimpleGrid>
            )}

            {/* Dialog for rename */}

            <Dialog.Root open={renameOpen} onOpenChange={(e) => setRenameOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title color="maroon">Rename Exhibition</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <Input
                                    placeholder="New name"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button bg="maroon" onClick={handleRename}>
                                    Save
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            {/* Dialog for delete */}
            <Dialog.Root open={deleteOpen} onOpenChange={(e) => setDeleteOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title color="maroon">Are you sure you want to delete the exhibition?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    bg="maroon"
                                    onClick={handleDelete}
                                >
                                    Yes
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

        </>
    )
}
