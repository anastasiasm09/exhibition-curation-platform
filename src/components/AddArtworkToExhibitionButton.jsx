import { isArtworkInExhibition } from "@/utils/Exhibitions";
import { Box, createListCollection, HStack, IconButton, Select, useSelectContext } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

export default function AddArtworkToExhibitionButton({ artwork, exhibitions, handleExhibitionSelect }) {

    const ExhibitionTrigger = () => {
        const select = useSelectContext();

        return (
            <IconButton
                aria-label="Add to exhibition"
                size="sm"
                color="maroon"
                variant="ghost"
                colorScheme="none"
                mt={-1} 
                pl={9}
                
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
            portalProps={{ appendToParentPortal: false }}
            multiple collection={exhibitionsCollection}
            size="sm"
            defaultValue={exhibitions
                .filter(exhibition => isArtworkInExhibition(exhibition, artwork))
                .map(exhibition => exhibition.id)
            }
            onValueChange={(selected) => {
                const selectedElement = selected?.value
                selectedElement.forEach((id) => {
                    handleExhibitionSelect(artwork, id || "")
                })
            }}
        >
            <Select.HiddenSelect />
            <Select.Control>
                    <ExhibitionTrigger/>
            </Select.Control>
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
        </Select.Root>
    )
}