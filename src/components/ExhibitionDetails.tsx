import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Box, Text, Image, SimpleGrid, Card, CardBody, CardTitle, Flex, Heading } from '@chakra-ui/react';
import ArtworkDialog from "./ArtworkDialog";
import { getEhibitionDetails, markAnExhibitionAsShared, stopSharingAnExhibition } from "@/utils/Exhibitions";
import { Icon, Switch } from "@chakra-ui/react"
import { IoMdLock, IoMdUnlock } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Artwork } from "@/models/Artwork";
import type { ExhibitionDetails } from "@/models/Exhibition.ts";


export default function ExhibitionDetails() {
    const { id } = useParams() as { id: string };
   
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const [exhibitionDetails, setExhibitionDetails] = useState<ExhibitionDetails>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isNotFound, setIsNotFound] = useState<boolean>(false);
    const [isShared, setIsShared] = useState<boolean>(false);

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

    if(!exhibitionDetails) return;

    function handleSwitch() {
        if (!isUserAuthenticated) return null;
      
        return (
          <Switch.Root colorPalette="black" size="lg" checked={isShared} onCheckedChange={handleShared}>
            <Switch.HiddenInput />
            <Switch.Control>
              <Switch.Thumb />
              <Switch.Indicator fallback={<Icon as={IoMdLock} color="gray.400" />}>
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
                                <CardTitle>{artwork.title}</CardTitle>
                                <Card.Description>{artwork.artist}</Card.Description>
                                <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                    {artwork.classification}
                                </Text>
                            </CardBody>
                        </Card.Root>
                    ))}
                </SimpleGrid>
            )}

            <ArtworkDialog
                artwork={selectedArtwork}
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                hideAddButton={true}
            />
        </>
    )
}