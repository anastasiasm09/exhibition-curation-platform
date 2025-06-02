import {
    Input,
    InputGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { LuSearch } from "react-icons/lu";


export default function Search({ onSearch, onFinish }) {
    const [search, setSearch] = useState('');

    const handleSearch = () => {
        onSearch(search.trim());

        if (onFinish) {
            onFinish();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <>
            <InputGroup endElement={<LuSearch />}>
                <Input flex="1" w="400px"
                    type="text"
                    placeholder='Search by artwork, artist or keywords'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </InputGroup>
        </>

    )
}