import { Dialog, Portal } from "@chakra-ui/react"
import { Box, Card, Image, CloseButton, Text, Flex } from "@chakra-ui/react"


export default function ArtworkDialog({ artwork, onOpen, onClose, artworkButton }) {
    if (!artwork) return null;

    return (
        <Dialog.Root
            open={onOpen}
            onOpenChange={(isOpen) => {
                if (!isOpen) onClose()
            }}
            size="full"
            motionPreset="slide-in-bottom"
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton onClick={onClose} size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>
                        <Dialog.Body >
                            <Card.Root
                                variant="ghost"
                                flexDirection={{ base: "column", md: "row" }}
                                overflow="hidden"
                                height="100%" >
                                <Image
                                    objectFit="contain"
                                    maxH="520px"
                                    naxW="100%"
                                    src={artwork.image}
                                    alt={artwork.title}
                                    borderRadius="md"
                                />
                                <Box>
                                    <Card.Body>
                                        <Card.Title mb="2">{artwork.title}</Card.Title>
                                        <Text mt={3} fontWeight="bold" >Artist: </Text>
                                        <Card.Description>{artwork.artist}</Card.Description>
                                        <Text mt={3} fontWeight="bold" >Date: </Text>
                                        <Card.Description>{artwork.date}</Card.Description>
                                        <Text mt={3} fontWeight="bold" >Technique / Material: </Text>
                                        <Card.Description>{artwork.technique}</Card.Description>
                                        <Text mt={3} fontWeight="bold" >Dimensions: </Text>
                                        <Card.Description>{artwork.dimensions}</Card.Description>
                                        <Text mt={3} fontWeight="bold" >Classification: </Text>
                                        <Card.Description>{artwork.classification}</Card.Description>

                                        <Flex mt={4} ml={-9} justify="flex-start">
                                            {artworkButton}
                                        </Flex>

                                    </Card.Body>
                                </Box>
                            </Card.Root>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}