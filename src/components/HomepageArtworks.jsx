import { Card, CardBody, CardTitle, Image, SimpleGrid, Text, IconButton, Button, HStack, Box } from '@chakra-ui/react';
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
    //const [exhibitionList, setExhibitionList] = useState(getAllExhibitions());

    const handleFilter = (selected) => {
        const selectedValues = selected.value[0]
        setValue([selectedValues]);
        onFilter(selectedValues);
    };

    const handleExhibitionSelect = (artwork, exhibitionName) => {
        console.log("Selected:", exhibitionName, artwork);
        if (!exhibitionName) return;

        addArtworkToExhibition(exhibitionName, artwork);

    };

    console.log(getAllExhibitions());

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
                    variant="outline"
                    aria-label="Add to exhibition"
                    mt="2"
                    size="sm"
                    color="maroon"
                    bg="white"
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
                            <CardTitle>{artwork.title}</CardTitle>
                            <Card.Description>{artwork.artist}</Card.Description>
                            <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                {artwork.classification}
                            </Text>
                            <Box mt={2}>
                                <Select.Root
                                    positioning={{ sameWidth: false }}
                                    collection={exhibitionsCollection}
                                    size="sm"
                                    width="100%"
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

                            </Box>
                        </CardBody>
                    </Card.Root>
                ))}
            </SimpleGrid>
        </>
    )
}