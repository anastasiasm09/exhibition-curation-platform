import {
    Input,
    InputGroup,
    IconButton,
} from '@chakra-ui/react';
import { LuSearch } from "react-icons/lu"

export default function Search() {
    return (
        <InputGroup flex="1" endElement={<LuSearch />}>
            <Input placeholder='Search by keywords, artist, or artwork'/>
        </InputGroup>
    )
}