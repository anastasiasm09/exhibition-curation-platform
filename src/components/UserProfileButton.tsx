import {
    IconButton,
    Text,
} from "@chakra-ui/react"
import { RiAccountCircleLine } from "react-icons/ri";
import { useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

import LogInDialog from "./LogInDialog";
import LogOutDialog from "./LogOutDialog";

type UserProfileButtonProps = {
    setMobileNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserProfileButton({ setMobileNavbarOpen }: UserProfileButtonProps) {
    const [open, setOpen] = useState<boolean>(false);
    const { isUserAuthenticated } = useContext(AuthContext);


    return (
        <>
            <IconButton
                aria-label="Login"
                size="sm"
                display={{ base: 'none', md: 'flex' }}
                color={isUserAuthenticated ? "maroon" : "black"}
                bg="gray.100"
                onClick={() => setOpen(true)}
            >
                <RiAccountCircleLine />
            </IconButton>

            <Text
                as="button"
                fontSize="sm"
                display={{ base: "flex", md: "none" }}
                fontWeight="semibold"
                color="black"
                flexDirection="column"
                _hover={{ color: "maroon" }}
                cursor="pointer"
                onClick={() => setOpen(true)}
            >
                Login
            </Text>

            {isUserAuthenticated ? (
                <LogOutDialog open={open} setOpen={setOpen} setMobileNavbarOpen={setMobileNavbarOpen} />
            ) : (
                <LogInDialog open={open} setOpen={setOpen} setMobileNavbarOpen={setMobileNavbarOpen} />
            )}
        </>
    )
}