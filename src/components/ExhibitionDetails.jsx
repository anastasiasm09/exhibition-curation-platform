import { useParams } from "react-router-dom";
import { Box, Text, Image, SimpleGrid, Card, CardBody, CardTitle, } from '@chakra-ui/react';


export default function ExhibitionDetails() {
    const { name } = useParams();
    const data = JSON.parse(localStorage.getItem('exhibitionData'));
    const exhibition = data?.[name];

    if (!exhibition) {
        return <Text>Exhibition not found</Text>
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
                                    src={artwork.image}
                                    alt={artwork.title}
                                />
                                <CardBody>
                                    <CardTitle>{artwork.title}</CardTitle>
                                    <Text mt={2}>{artwork.title}</Text>
                                    <Card.Description>{artwork.artist}</Card.Description>
                                    <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                        {artwork.classification}
                                    </Text>
                                </CardBody>
                            </Card.Root>
                        ))}
                    </SimpleGrid>
                </Box>
            )}
        </>
    )
}