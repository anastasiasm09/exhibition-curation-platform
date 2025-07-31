import { addArtworkToExhibition, isArtworkInExhibition } from "@/utils/Exhibitions";
import { Box, createListCollection, HStack, IconButton, Portal, Select, useSelectContext } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

export default function AddArtworkToExhibitionButton({ artwork, exhibitions }) {
    const handleExhibitionSelect = (artwork, exhibitionId) => {
        if (!exhibitionId) return;

        addArtworkToExhibition(exhibitionId, artwork);
    };

    const ExhibitionTrigger = () => {
        const select = useSelectContext();

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

    const exhibitionItems = exhibitions.map((exb) => ({
        label: exb.name,
        value: exb.id,
    }));

    const exhibitionsCollection = createListCollection({
        items: exhibitionItems
    });

    return (
        <Select.Root
            positioning={{ sameWidth: false }}
            collection={exhibitionsCollection}
            size="sm"
            defaultValue={
                exhibitions
                    .filter(exhibition => isArtworkInExhibition(exhibition, artwork))
                    .map(exhibition => exhibition.id)
            }
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
    )
}