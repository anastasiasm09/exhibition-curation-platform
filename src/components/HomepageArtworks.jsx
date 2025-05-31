import { Card, CardBody, CardTitle, Image, SimpleGrid, Text, IconButton, Button, HStack, Box, Grid } from '@chakra-ui/react';
import { Portal, Select, createListCollection, useSelectContext } from "@chakra-ui/react"
import { addArtworkToExhibition, createExhibition, getAllExhibitions } from "@/utils/Exhibitions";
import { Tooltip } from "@/components/ui/tooltip"
import { useState } from "react";
import { MdAdd } from "react-icons/md";


export default function HomepageArtworks({ artworks, onFilter }) {
    const lables = createListCollection({
        items: [
            { label: "Drawing", value: "drawing" },
            { label: "Textile", value: "textile" },
            { label: "Lithograph", value: "lithograph" },
            { label: "Painting", value: "painting" },
            { label: "Print", value: "print" },
            { label: "Photograph", value: "photograph" },
            { label: "Sculpture", value: "sculpture" },
        ],
    })

    const [value, setValue] = useState("");

    const handleFilter = (selected) => {
        const selectedValues = selected.value[0]
        setValue([selectedValues]);
        onFilter(selectedValues);
    };

    const handleExhibitionSelect = (artwork, exhibitionName) => {
        if (!exhibitionName) return;

        addArtworkToExhibition(exhibitionName, artwork);
    };

    const exhibitionItems = getAllExhibitions().map((exb) => ({
        label: exb.name,
        value: exb.name
    }));

    const exhibitionsCollection = createListCollection({
        items: exhibitionItems
    });

    const ExhibitionTrigger = () => {
        const select = useSelectContext()
        return (
            <Tooltip
                content="Add to my exhibition"
                positioning={{ placement: "right-end" }}
            >
                <IconButton
                    aria-label="Add to exhibition"
                    variant="ghost"
                    size="sm"
                    color="maroon"
                    bg="white"
                    overflow="hidden"
                    
                    {...select.getTriggerProps()}
                >
                    <MdAdd />
                </IconButton>
            </Tooltip>
        )
    }


    return (
        <>
            {/* Filter */}
            <Select.Root
                collection={lables}
                size="sm"
                width="320px"
                value={value}
                onValueChange={handleFilter}

            >
                <Select.HiddenSelect />
                <Select.Label textAlign="left" px={8}>Filter artworks by type</Select.Label>
                <Select.Control px={4}>
                    <Select.Trigger borderColor="#fafafa" px={4}>
                        <Select.ValueText placeholder="Select" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
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

            {/* List of Artworcs */}
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
                            <Grid templateColumns="1fr auto" alignItems="start">
                                <CardTitle>{artwork.title}</CardTitle>
                                <Select.Root
                                    positioning={{ sameWidth: false }}
                                    collection={exhibitionsCollection}
                                    size="sm"
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
                                                {exhibitionsCollection.items.map((exb) => (
                                                    <Select.Item item={exb} key={exb.value}>
                                                        <HStack>{exb.label}</HStack>
                                                        <Select.ItemIndicator />
                                                    </Select.Item>
                                                ))}
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
        </>
    )
}