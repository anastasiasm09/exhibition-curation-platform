import { useState } from "react"
import { Button, CloseButton, Dialog, Portal, Input, Stack } from "@chakra-ui/react"


export default function Exhibitions() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function createExhibition(name, description) {
        const exhibitionData = localStorage.getItem("exhibitionData")

        const allArtworks = exhibitionData ? JSON.parse(exhibitionData) : {}
        allArtworks[name] = { name, description, artworks: [] }

        localStorage.setItem("exhibitionData", JSON.stringify(allArtworks))
    }

    function handleCreate() {
        if (!name.trim()) return;
        createExhibition(name, description);
        setName("");
        setDescription("");
    }

    return (
        <Dialog.Root lazyMount open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                <Button display="flex" bg="white" variant="outline">Create Exhibition</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title color="maroon">Create Exhibition</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap="4">
                                <Input
                                    px={4}
                                    placeholder="Exhibition name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Input
                                    p={12}
                                    px={4}
                                    textAlign="start"
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button bg="maroon" onClick={handleCreate}>Create</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
