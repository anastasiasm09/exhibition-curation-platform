import { useState } from 'react';
import Search from './Search';

import {
    Button,
    CloseButton,
    Drawer,
    For,
    HStack,
    Portal,
    Box,
    IconButton,
    InputGroup,
    Input,
} from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu";

type SearchProps = {
    onSearch: (query: string) => void;
    onFinish?: () => void;
    initialSearch: string;
}

export default function SearchDrawer({ onSearch, onFinish, initialSearch }: SearchProps) {
    const [open, setOpen] = useState<boolean>(false);


    return (
        <HStack wrap="wrap">
          
                    <Drawer.Root 
                    placement="top"
                    open={open} 
                    onOpenChange={(e) => setOpen(e.open)}
                    > 
                        <Drawer.Trigger asChild>
                            
                        </Drawer.Trigger>
                        <Portal>
                            <Drawer.Backdrop />
                            <Drawer.Positioner>
                                <Drawer.Content
                          
                                >
                                    <Drawer.Header>
                                        <Drawer.Title>Drawer Title</Drawer.Title>
                                    </Drawer.Header>
                                    <Drawer.Body>
                                        <Box maxW={{ md: "200px", lg: "350px" }}>
                                            <Search onSearch={onSearch} initialSearch={initialSearch}/>
                                        </Box>
                                    </Drawer.Body>
                                    <Drawer.Footer>
                                        <Drawer.ActionTrigger asChild>
                                            <Button variant="outline">Cancel</Button>
                                        </Drawer.ActionTrigger>
                                        <Button>Save</Button>
                                    </Drawer.Footer>
                                    <Drawer.CloseTrigger asChild>
                                        <CloseButton size="sm" />
                                    </Drawer.CloseTrigger>
                                </Drawer.Content>
                            </Drawer.Positioner>
                        </Portal>
                    </Drawer.Root>
            
        </HStack>
    )
}