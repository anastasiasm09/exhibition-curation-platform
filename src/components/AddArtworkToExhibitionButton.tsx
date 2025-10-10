import { isArtworkInExhibition } from "@/utils/Exhibitions";
import { Box, createListCollection, HStack, IconButton, Select, useSelectContext } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { MdAdd } from "react-icons/md";
import { AuthContext } from "@/context/AuthContext";
import { Tooltip } from "@/components/ui/tooltip";
import { Artwork } from "@/models/Artwork";
import { Exhibition } from "@/models/Exhibition";

type AddArtworkToExhibitionButtonProps = {
    artwork: Artwork;
    exhibitions: Exhibition[];
    handleExhibitionSelect: Function;
}


export default function AddArtworkToExhibitionButton({ artwork, exhibitions, handleExhibitionSelect }: AddArtworkToExhibitionButtonProps) {

    const ExhibitionTrigger = () => {
        const select = useSelectContext();

        return (
            <>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    w="28px"
                    h="28px"
                    mt={0.5}
                    pr={3}
                >
                    {!isUserAuthenticated ? (
                        <Tooltip
                            content="Please log in to add the artwork to exhibitions."
                            openDelay={200}
                        >
                            <MdAdd />
                        </Tooltip>
                    ) : (
                        <IconButton
                            aria-label="Add to exhibition"
                            size="sm"
                            color="maroon"
                            variant="plain"
                            colorScheme="none"

                            {...select.getTriggerProps()}
                        >
                            <MdAdd />
                        </IconButton>
                    )}
                </Box>
            </>
        )
    }

    const exhibitionItems = exhibitions.map((exb) => ({
        label: exb.name,
        value: exb.id,
    }));

    const exhibitionsCollection = createListCollection({
        items: exhibitionItems
    });

    const [value, setValue] = useState<string[]>([]);
    const { isUserAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        if (isUserAuthenticated) {
            const selectedExhibitions = exhibitions
                .filter(exhibition => isArtworkInExhibition(exhibition, artwork))
                .map(exhibition => exhibition.id)

            setValue(selectedExhibitions)
        }
    }, [artwork, exhibitions, isUserAuthenticated]);

    return (
        <Select.Root
            positioning={{ sameWidth: false }}
            collection={exhibitionsCollection}
            closeOnSelect={true}
            size="sm"
            value={value}
            onValueChange={(e) => {
                const selectedExhibitionId = e.value[0]
                setValue(prevValue => prevValue.concat(selectedExhibitionId))
                handleExhibitionSelect(artwork, selectedExhibitionId)
            }}
        >
            <Select.HiddenSelect />
            <Select.Control>
                <ExhibitionTrigger />
            </Select.Control>
            {isUserAuthenticated && (
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
            )}
        </Select.Root>
    )
}
