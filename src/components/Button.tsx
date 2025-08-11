

import { CredentialResponse, GoogleLogin, googleLogout } from "@react-oauth/google"
import {
    IconButton,
    Portal,
    Dialog,
    Button,
    CloseButton, Text,
    AbsoluteCenter,
    Box,
    Tag,
} from "@chakra-ui/react"

import { RiAccountCircleLine } from "react-icons/ri";
import { useContext, useState, useEffect } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { setGoogleToken, removeGoogleToken } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";
import { getUserDetails } from "@/utils/Exhibitions";

type UserProfileButtonProps = {
    setMobileNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserProfileButton({ setMobileNavbarOpen }: UserProfileButtonProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [loginStatus, setLoginStatus] = useState<"success" | "error" | null>(null);
    const messageSuccess = "You have successfully logged in.";
    const messageNoCrRes = "No credential received.";
    const messageError = "Login failed";
    const [name, setName] = useState<string>("");

    const { isUserAuthenticated, setIsUserAuthenticated } = useContext(AuthContext);

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setGoogleToken(response.credential)
            setOpen(false)
            setMobileNavbarOpen?.(false)
            setIsUserAuthenticated(true)

            getUserDetails()
                .then((data) => setName(`${data.first_name}!`))
                .catch((err) => console.error(err));

            setLoginStatus("success")
            toaster.create({
                title: messageSuccess,
                type: "success",
            });

        } else if (!response.credential) {
            setLoginStatus("error")
            toaster.create({
                title: messageError,
                type: "error",
            });

        } else {
            toaster.create({
                title: messageNoCrRes,
                type: "error",
            });
        }
    };

    const handleError = () => {
        toaster.create({
            title: messageError,
            type: "error",
        });
    };

    function handleLogout() {
        removeGoogleToken();
        googleLogout();
        setIsUserAuthenticated(false);
        window.location.reload()
    };

    useEffect(() => {
        if (!isUserAuthenticated) return;
        getUserDetails()
            .then((data) => {
                setName(`${data.first_name}!`);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [isUserAuthenticated]);


    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)} >
                <Dialog.Trigger asChild>
                    <IconButton
                        aria-label="Login"
                        size="sm"
                        display={{ base: 'none', md: 'flex' }}
                        color={loginStatus === "success" ? "maroon" : "black"}
                        bg="gray.100"
                    >
                        <RiAccountCircleLine />
                    </IconButton>
                </Dialog.Trigger>

                <Dialog.Trigger asChild>
                    <Text
                        as="button"
                        fontSize="sm"
                        display={{ base: "flex", md: "none" }}
                        fontWeight="semibold"
                        color="black"
                        flexDirection="column"
                        _hover={{ color: "maroon" }}
                        cursor="pointer"
                    >
                        Login
                    </Text>
                </Dialog.Trigger>

                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                {!isUserAuthenticated ? (
                                    <Dialog.Title>Login</Dialog.Title>
                                ) : (
                                    <Dialog.Title>Hi {name}</Dialog.Title>
                                )}
                            </Dialog.Header >
                            {!isUserAuthenticated &&
                                <Tag.Root m="6" mb="4" mt="-1" fontWeight="normal" fontSize={12}>
                                    <Tag.Label>Exhibition Platform does not use your email address, it only stores First name</Tag.Label>
                                </Tag.Root>
                            }
                            <Dialog.Body position="relative">
                                {!isUserAuthenticated ? (
                                    <AbsoluteCenter w="100%">
                                        <Box w="90%">
                                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                                        </Box>
                                    </AbsoluteCenter>
                                ) : (
                                    <AbsoluteCenter w="100%">
                                        <Button w="90%" position="relative" variant="outline" onClick={handleLogout}>Log out</Button>
                                    </AbsoluteCenter>
                                )}
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button mt="2" variant="outline">Cancel</Button>
                                </Dialog.ActionTrigger>
                            </Dialog.Footer>
                            <Dialog.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
            <Toaster />
        </>
    )
}
