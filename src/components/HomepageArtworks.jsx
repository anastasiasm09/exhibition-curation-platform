import { Card, CardBody, CardTitle, Image, SimpleGrid, Text } from '@chakra-ui/react';


export default function HomepageArtworks({ artworks }) {


    return (
        <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={4}
            p={4}
        >
            {artworks.map((artwork, index) => (
                <Card.Root borderColor="#fafafa" maxW="sm" overflow="hidden" key={artwork.id}>
                    <Image
                        src={artwork.image}
                        alt="artwork"
                    />
                    <CardBody>
                        <CardTitle>{artwork.title}</CardTitle>
                        <Card.Description>{artwork.artist}</Card.Description>
                        <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                            {artwork.classification}
                        </Text>
                    </CardBody>
                </Card.Root>
            )
            )}
        </SimpleGrid>
    )
}