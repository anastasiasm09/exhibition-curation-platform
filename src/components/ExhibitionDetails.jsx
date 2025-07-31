import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Text, Image, SimpleGrid, Card, CardBody, CardTitle, } from '@chakra-ui/react';
import ArtworkDialog from "./ArtworkDialog";
import { getEhibitionDetails } from "@/utils/Exhibitions";
import { AuthContext } from "@/context/AuthContext";

export default function ExhibitionDetails() {
    const { id } = useParams();

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [exhibitionDetails, setExhibitionDetails] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [isNotFound, setIsNotFound] = useState(false)

    function handleOpenDialog(artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    }

    useEffect(() => {
        getEhibitionDetails(id).then((exhibitionDetails) => {
            setExhibitionDetails(exhibitionDetails)
            setIsLoading(false)
        }).catch(isNotFound => {
            setIsNotFound(isNotFound)
            setIsLoading(false)
        })
    }, [id]);

    function errorMessage(message) {
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


    return (
        <>
            {exhibitionDetails.artworks.length === 0 ? (
                errorMessage("You have not added any artworks yet.")
            ) : (
                <Box p={6}>
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={4}
                        p={4}
                    >
                        {exhibitionDetails.artworks.map((artwork) => (
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
                                    <CardTitle>{artwork.title}</CardTitle>
                                    <Card.Description>{artwork.artist}</Card.Description>
                                    <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                        {artwork.classification}
                                    </Text>
                                </CardBody>
                            </Card.Root>
                        ))}
                    </SimpleGrid>
                </Box>
            )
            }

            <ArtworkDialog
                artwork={selectedArtwork}
                onOpen={openDialog}
                onClose={() => setOpenDialog(false)} />
        </>
    )
}