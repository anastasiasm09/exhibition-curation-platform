import Search from './Search';
import {
    CloseButton,
    Drawer,
    Portal,
    Box
} from "@chakra-ui/react"

type SearchDrawerProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSearch: (value: string) => void;
    onFinish?: () => void;
    initialSearch: string;
}

export default function SearchDrawer({ open, setOpen, onSearch, initialSearch }: SearchDrawerProps) {

    return (
        <>
            <Drawer.Root
                placement="top"
                open={open}
                onOpenChange={(e) => setOpen(e.open)}
            >
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header px="2rem">
                                <Drawer.Title>Search</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Box>
                                    <Search 
                                        onSearch={onSearch} 
                                        initialSearch={initialSearch} 
                                        onFinish={() => setOpen(false)}
                                    />
                                </Box>
                            </Drawer.Body>
                            <Drawer.Footer>
                            </Drawer.Footer>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton px="2rem" size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </>
    )
}