import { Card, CardBody, CardTitle, Image, SimpleGrid, Text, IconButton, HStack, Box, Grid } from '@chakra-ui/react';
import { Portal, Select, createListCollection, useSelectContext } from "@chakra-ui/react"
import { addArtworkToExhibition, getAllExhibitions, isArtworkInExhibition } from "@/utils/Exhibitions";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import ArtworkDialog from './ArtworkDialog';


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


    const handleFilter = (selected) => {
        const selectedValues = selected.value[0] || ""
        setValue([selectedValues]);
        onFilter(selectedValues);
    };

    const handleExhibitionSelect = (artwork, exhibitionName) => {
        if (!exhibitionName) return;

        addArtworkToExhibition(exhibitionName, artwork);
    };

    const allExhibitions = getAllExhibitions();

    const exhibitionItems = allExhibitions.map((exb) => ({
        label: exb.name,
        value: exb.name
    }));

    const exhibitionsCollection = createListCollection({
        items: exhibitionItems
    });

    const ExhibitionTrigger = () => {
        const select = useSelectContext()
        return (

            <IconButton
                aria-label="Add to exhibition"
                size="sm"
                color="maroon"
                bg="white"
                variant="ghost"

                {...select.getTriggerProps()}
            >
                <MdAdd />
            </IconButton>
        )
    }


    function handleOpenDialog(artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    }



    return (
        <>
            {/* Filter */}

            {!isLoading && (
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
                                <Select.Root
                                    positioning={{ sameWidth: false }}
                                    collection={exhibitionsCollection}
                                    size="sm"
                                    defaultValue={allExhibitions.map(e => e.name).filter((exhibitionName) => (
                                        isArtworkInExhibition(allExhibitions, exhibitionName, artwork))
                                    )}
                                    onValueChange={(selected) =>
                                        handleExhibitionSelect(artwork, selected?.value?.[0] || "")
                                    }
                                >
                                    <Select.HiddenSelect />
                                    <Select.Control>
                                        <ExhibitionTrigger />
                                    </Select.Control>
                                    <Portal>
                                        <Select.Positioner>
                                            <Select.Content minW="32">
                                                {exhibitionsCollection.items.length === 0 ? (
                                                    <Box px={4} py={2} color="gray.500">
                                                        You have no exhibitions at the moment
                                                    </Box>
                                                ) : (
                                                    exhibitionsCollection.items.map((exb) => (
                                                        <Select.Item item={exb} key={exb.value}>
                                                            <HStack>{exb.label}</HStack>
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))
                                                )}

                                            </Select.Content>
                                        </Select.Positioner>
                                    </Portal>
                                </Select.Root>
                            </Grid>

                            <Card.Description>{artwork.artist}</Card.Description>
                            <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                {artwork.classification}
                            </Text>
                        </CardBody>
                    </Card.Root>
                ))}
            </SimpleGrid>

            {openDialog && (
                <ArtworkDialog
                    artwork={selectedArtwork}
                    onOpen={openDialog}
                    onClose={() => setOpenDialog(false)} />
            )}
        </>
    )
}