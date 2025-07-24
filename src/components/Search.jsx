import {
    Input,
    InputGroup,
} from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



export default function Search({ onSearch, onFinish }) {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        onSearch(search.trim());

        if (onFinish) {
            onFinish();
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' ) {
            if (window.location.pathname !== "/") {
                navigate("/")
            }
            handleSearch();
        }
    };


    return (
        <>
            <InputGroup startElement={<LuSearch />}>
                <Input flex="1" w="400px"
                    type="text"
                    placeholder='Search by artwork, artist or keywords'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                    bg="gray.100"
                />
            </InputGroup>
        </>

    )
}