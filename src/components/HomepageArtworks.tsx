import { Card, CardBody, CardTitle, Image, SimpleGrid, Text, Grid, Box } from '@chakra-ui/react';
import { Portal, Select, createListCollection } from "@chakra-ui/react"
import { addArtworkToExhibition, getAllExhibitions } from "@/utils/Exhibitions";
import { useState, useEffect, useContext } from "react";
import ArtworkDialog from './ArtworkDialog';
import { AuthContext } from "@/context/AuthContext";
import AddArtworkToExhibitionButton from './AddArtworkToExhibitionButton';
import { toaster } from "@/components/ui/toaster"
import { Artwork } from '@/models/Artwork';
import { Exhibition } from '@/models/Exhibition';

type HomepageArtworksProps = {
    artworks: Artwork[];
    onFilter: (value: string[] | null) => void;
    isLoading: boolean;
}

type SelectedValue = {
    value: string[]
}

export default function HomepageArtworks({ artworks, onFilter, isLoading }: HomepageArtworksProps) {
    const lables = createListCollection({
        items: [
            { label: "Lithograph", value: "lithograph" },
            { label: "Print", value: "print" },
            { label: "Photograph", value: "photograph" },
            { label: "Sculpture", value: "sculpture" },
        ],
    })

    const [value, setValue] = useState<string[]>([]);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
    const [exhibitions, setExhibitions] = useState<Exhibition[]>([]);

    const { isUserAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isUserAuthenticated) {
            getAllExhibitions().then((exhibitions) => {
                setExhibitions(exhibitions)
            })
        }
    }, [isUserAuthenticated]);

    const handleFilter = (selected: SelectedValue) => {
        const selectedValues = selected.value || ""
        setValue(selectedValues);
        onFilter(selectedValues);
    };

    function handleOpenDialog(artwork: Artwork) {
        setSelectedArtwork(artwork)
        setOpenDialog(true)
    };

    const handleExhibitionSelect = (artwork: Artwork, exhibitionId: string) => {
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
                rowGap={4}
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
                                <Box
                                    mt="-2px"
                                    ml={6}>
                                            <AddArtworkToExhibitionButton
                                            artwork={artwork}
                                            exhibitions={exhibitions ?? []}
                                            handleExhibitionSelect={handleExhibitionSelect}
                                        />                                       
                                </Box>

                            </Grid>
                            <Card.Description>{artwork.artist}</Card.Description>
                            <Text textStyle="sm" fontWeight="normal" letterSpacing="tight" mt="2">
                                {artwork.classification}
                            </Text>
                        </CardBody>
                    </Card.Root>
                ))}
            </SimpleGrid >

            {selectedArtwork && (
                <ArtworkDialog
                    artwork={selectedArtwork}
                    exhibitions={exhibitions ?? []}
                    handleExhibitionSelect={handleExhibitionSelect}
                    isOpen={openDialog}
                    onClose={() => { setOpenDialog(false) }}
                    hideAddButton={false}
                />
            )}
        </>
    )
}
