import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Box, Text, Image, SimpleGrid, Card, CardBody, CardTitle, Flex, Heading, IconButton, Dialog, Portal, Button, CloseButton, Grid, CardFooter } from '@chakra-ui/react';
import ArtworkDialog from "./ArtworkDialog";
import { deleteArtworkFromExhibition, getEhibitionDetails, markAnExhibitionAsShared, stopSharingAnExhibition } from "@/utils/Exhibitions";
import { Icon, Switch } from "@chakra-ui/react"
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Artwork } from "@/models/Artwork";
import type { ExhibitionDetails } from "@/models/Exhibition.ts";
import { MdDeleteOutline } from "react-icons/md";
import { toaster } from "@/components/ui/toaster"


export default function ExhibitionDetails() {
    const { id } = useParams() as { id: string };

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const [exhibitionDetails, setExhibitionDetails] = useState<ExhibitionDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNotFound, setIsNotFound] = useState<boolean>(false);
    const [isShared, setIsShared] = useState<boolean>(false);
    const [artworkToDelete, setArtworkToDelete] = useState<string>();
    const [deleteOpenDialog, setDeleteOpenDialog] = useState<boolean>(false);

    const { isUserAuthenticated } = useContext(AuthContext);

    function handleOpenDialog(artwork: Artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    }

    useEffect(() => {
        getEhibitionDetails(id).then((exhibitionDetails) => {
            setExhibitionDetails(exhibitionDetails)
            setIsShared(exhibitionDetails.isShared)
            setIsLoading(false)
        }).catch(isNotFound => {
            setIsNotFound(isNotFound)
            setIsLoading(false)
        })
    }, [id]);

    function errorMessage(message: string) {
        return (
            <Box px={4} py={6} display="flex" justifyContent="center" alignItems="center" minH="40vh">
                <Text
                    fontSize="lg"
                    color="gray.500"
                    fontStyle="italic"
                    fontWeight="bold"
                    textAlign="center"
                    wordBreak="break-word"
                >
                    {message}
                </Text>
            </Box>
        )
    }

    if (isLoading) {
        return;
    } else if (isNotFound) {
        return errorMessage("Exhibition not found");
    }

    if (!exhibitionDetails) return;

    function handleSwitch() {
        if (!isUserAuthenticated) return null;

        return (
            <Switch.Root colorPalette="black" size="lg" checked={isShared} onCheckedChange={handleShared}>
                <Switch.HiddenInput />
                <Switch.Control>
                    <Switch.Thumb />
                    <Switch.Indicator fallback={<Icon as={IoMdLock} />}>
                        <Icon as={IoMdUnlock} color="white" />
                    </Switch.Indicator>
                </Switch.Control>
                <Switch.Label>
                    {isShared ? "Public" : "Private"}
                </Switch.Label>
            </Switch.Root>
        );
    }

    function handleShared() {
        if (isShared) {
            setIsShared(false)
            stopSharingAnExhibition(id)
        } else {
            setIsShared(true)
            markAnExhibitionAsShared(id)
        }
    }

    function handleArtworkDelete() {
        if (!artworkToDelete?.trim()) return;

        deleteArtworkFromExhibition(id, artworkToDelete)
            .then(() => {
                setExhibitionDetails(prev => {
                    if (!prev) return prev;

                    return {
                        ...prev,
                        artworks: prev.artworks.filter(a => a.id !== artworkToDelete)
                    };
                });

                setDeleteOpenDialog(false);
                setArtworkToDelete('');
            })
            .catch(err => console.error(err));

        toaster.create({
            description: "Artwork deleted successfully",
            type: "info",
        })
    };

    return (
        <>
            <Flex justify="space-between" align="center" mt={10} px={4} py={6}>
                <Heading fontSize={{ base: "md", md: "sm", lg: "2xl" }} letterSpacing={1} fontWeight="bold">
                    {exhibitionDetails.name}
                </Heading>
                {handleSwitch()}
            </Flex>
            <Flex mt={2} mb={8} px={4}>
                <Text>
                    {exhibitionDetails.description}
                </Text>
            </Flex>

            {exhibitionDetails.artworks.length === 0 ? (
                errorMessage("You have not added any artworks yet.")
            ) : (
                <SimpleGrid
                    columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                    rowGap={4}
                    p={4}
                >

                    {exhibitionDetails.artworks.map((artwork: Artwork) => (
                        <Card.Root borderColor="#fafafa" maxW="sm" overflow="hidden" key={artwork.id}>
                            <Image
                                key={artwork.id}
                                src={artwork.image}
                                alt={artwork.title}
                                cursor="pointer"
                                onClick={() => {
                                    handleOpenDialog(artwork)
                                }}
                            />
                            <CardBody>
                                <Grid templateColumns="1fr auto" alignItems="start">

                                    <CardTitle>{artwork.title}</CardTitle>
                                   
                                </Grid>
                                <Card.Description>{artwork.artist}</Card.Description>
                                <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                    {artwork.classification}
                                </Text>
                            </CardBody>
                            <CardFooter>
                                     <Box>
                                        <IconButton
                                            aria-label="Delete artwork from an exhibition"
                                            size="md"
                                            display={{ base: 'none', md: 'flex' }}
                                            color="maroon"
                                            variant="plain"
                                            colorScheme="none"
                                            onClick={() => {
                                                setDeleteOpenDialog(true)
                                                setArtworkToDelete(artwork.id)
                                            }}
                                        >
                                            <MdDeleteOutline />
                                            <Text>Delete artwork</Text>
                                        </IconButton>
                                    </Box>
                                </CardFooter>
                        </Card.Root>
                    ))}
                </SimpleGrid>
            )}

            {/* Dialog for delete artwork */}
            <Dialog.Root open={deleteOpenDialog} onOpenChange={(e) => setDeleteOpenDialog(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title color="maroon">Are you sure you want to delete this artwork from the exhibition?</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                                <Button
                                    bg="maroon"
                                    onClick={handleArtworkDelete}
                                >
                                    Yes
                                </Button>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton variant="plain" size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>

            <ArtworkDialog
                artwork={selectedArtwork}
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                hideAddButton={true}
            />
        </>
    )
}