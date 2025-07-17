import { useParams } from "react-router-dom";
import { useState } from "react";
import { Box, Text, Image, SimpleGrid, Card, CardBody, CardTitle, } from '@chakra-ui/react';
import ArtworkDialog from "./ArtworkDialog";


export default function ExhibitionDetails() {
    const { name } = useParams();
    const data = JSON.parse(localStorage.getItem('exhibitionData'));
    const exhibition = data?.[name];

    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);

    if (!exhibition) {
        return <Text>Exhibition not found</Text>
    }

    function handleOpenDialog(artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    }


    return (
        <>
            {exhibition.artworks.length === 0 ? (
                <Box px={4} py={6} display="flex" justifyContent="center" alignItems="center" minH="40vh">
                    <Text
                        fontSize="lg"
                        color="gray.500"
                        fontStyle="italic"
                        fontWeight="bold"
                        textAlign="center"
                        wordBreak="break-word"
                    >
                        You have not added any artworks yet.
                    </Text>
                </Box>
            ) : (
                <Box p={6}>
                    <SimpleGrid
                        columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                        spacing={4}
                        p={4}
                    >
                        {exhibition.artworks.map((artwork) => (
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