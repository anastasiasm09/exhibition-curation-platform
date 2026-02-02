import {
    Input,
    InputGroup,
    CloseButton,
    Box,
} from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type SearchProps = {
    onSearch: (query: string) => void;
    onFinish?: () => void;
    initialSearch: string;
}

export default function Search({ onSearch, onFinish, initialSearch }: SearchProps) {
    const [search, setSearch] = useState<string>(initialSearch);
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleSearch = () => {
        onSearch(search.trim());

        if (onFinish) {
            onFinish();
        }
    };

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') {
            if (window.location.pathname !== "/") {
                navigate("/")
            }
            handleSearch();
        }
    };

    const endElement = search ? (
        <CloseButton
            size="xs"
            onClick={() => {
                setSearch("");
                onSearch("");
                inputRef.current?.focus()
            }}
        />
    ) : undefined

    return (
        <>
            <Box
                maxW="800px"
                w="100%"
                mx="auto"
            >
                <InputGroup
                    startElement={<LuSearch />}
                    endElement={endElement}
                >
                    <Input
                        ref={inputRef}
                        alignItems="center"
                        size="lg"
                        w="800px"
                        type="text"
                        placeholder='Search by artwork, artist or keywords'
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        onKeyDown={handleKeyDown}
                    />
                </InputGroup>
            </Box>
        </>
    )
}