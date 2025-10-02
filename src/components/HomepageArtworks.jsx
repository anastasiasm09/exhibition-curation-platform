import { Card, CardBody, CardTitle, Image, SimpleGrid, Text, IconButton, Grid } from '@chakra-ui/react';
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { addArtworkToExhibition, getAllExhibitions } from "@/utils/Exhibitions";
import { useState, useEffect, useContext } from "react";
import { MdAdd } from "react-icons/md";
import ArtworkDialog from './ArtworkDialog';
import { Tooltip } from "@/components/ui/tooltip";
import { AuthContext } from "@/context/AuthContext";
import AddArtworkToExhibitionButton from './AddArtworkToExhibitionButton';
import { toaster } from "@/components/ui/toaster"


export default function HomepageArtworks({ artworks, onFilter, isLoading }) {
    const lables = createListCollection({
        items: [
            { label: "Lithograph", value: "lithograph" },
            { label: "Print", value: "print" },
            { label: "Photograph", value: "photograph" },
            { label: "Sculpture", value: "sculpture" },
        ],
    })

    const [value, setValue] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [exhibitions, setExhibitions] = useState(null);

    const { isUserAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isUserAuthenticated) {
            getAllExhibitions().then((exhibitions) => {
                setExhibitions(exhibitions)
            })
        }
    }, [isUserAuthenticated]);

    const handleFilter = (selected) => {
        const selectedValues = selected.value || ""
        setValue([selectedValues]);
        onFilter(selectedValues);
    };

    function handleOpenDialog(artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    };

    const handleExhibitionSelect = (artwork, exhibitionId) => {
        if (!exhibitionId) return;
        addArtworkToExhibition(exhibitionId, artwork);

        const updatedExhibitions = exhibitions.map(exhibition => {
            if (exhibition.id === exhibitionId) {
                return { ...exhibition, artwork_ids: [...exhibition.artwork_ids, artwork.id] }
            } else {
                return exhibition
            }
        })

        setExhibitions(updatedExhibitions)

        toaster.create({
            description: "Artwork added successfully",
            type: "info",
        })
    };

    return (
        <>
            {/* Filter */}
            {!isLoading && artworks.length > 0 && (
                <Select.Root
                    collection={lables}
                    size="sm"
                    width="320px"
                    value={value}
                    onValueChange={handleFilter}
                >
                    <Select.HiddenSelect />
                    <Select.Label textAlign="left" px={8}>Filter by classification</Select.Label>
                    <Select.Control px={4}>
                        <Select.Trigger borderColor="#fafafa" px={4}>
                            <Select.ValueText placeholder="Select" />
                        </Select.Trigger>
                        <Select.IndicatorGroup>
                            <Select.ClearTrigger />
                            <Select.Indicator px={4} />
                        </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                        <Select.Positioner>
                            <Select.Content>
                                {lables.items.map((lables) => (
                                    <Select.Item item={lables} key={lables.value}>
                                        {lables.label}
                                        <Select.ItemIndicator />
                                    </Select.Item>
                                ))}
                            </Select.Content>
                        </Select.Positioner>
                    </Portal>
                </Select.Root>
            )}

            {/* List of Artworcs */}
            <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
                spacing={4}
                p={4}
            >
                {artworks.map((artwork) => (
                    <Card.Root borderColor="#fafafa" maxW="xs" overflow="hidden" key={artwork.id}>
                        <Image
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
                                {exhibitions ? (
                                    <AddArtworkToExhibitionButton
                                        artwork={artwork}
                                        exhibitions={exhibitions}
                                        handleExhibitionSelect={handleExhibitionSelect}
                                    />
                                ) : (
                                    <Tooltip
                                        showArrow
                                        content="Please log in to add the artwork to exhibitions."
                                        openDelay={200}
                                    >
                                        <IconButton
                                            aria-label="Add to exhibition"
                                            size="sm"
                                            color="gray"
                                            bg="white"
                                            variant="plain"
                                            isDisabled
                                            cursor="default"
                                            mt={-1}
                                            pl={7}
                                        >
                                            <MdAdd />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </Grid>
                            <Card.Description>{artwork.artist}</Card.Description>
                            <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                {artwork.classification}
                            </Text>
                        </CardBody>
                    </Card.Root>
                ))}
            </SimpleGrid >

            {openDialog && (
                <ArtworkDialog
                    artwork={selectedArtwork}
                    exhibitions={exhibitions ?? []}
                    handleExhibitionSelect={handleExhibitionSelect}
                    onOpen={openDialog}
                    onClose={() => { setOpenDialog(false) }}
                />
            )}
        </>
    )
}
