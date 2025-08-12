import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useContext } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { setGoogleToken } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";
import {
    Portal,
    Dialog,
    Button,
    CloseButton,
    AbsoluteCenter,
    Box,
    Tag
} from "@chakra-ui/react"

type LogInDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMobileNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LogInDialog({ open, setOpen, setMobileNavbarOpen }: LogInDialogProps) {
    const messageSuccess = "You have successfully logged in.";
    const messageNoCredentialResponse = "No credential received.";
    const messageError = "Login failed";

    const { setIsUserAuthenticated } = useContext(AuthContext);

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setGoogleToken(response.credential)
            setOpen(false)
            setMobileNavbarOpen?.(false)
            setIsUserAuthenticated(true)
            toaster.create({
                title: messageSuccess,
                type: "success",
            });

        } else if (!response.credential) {
            toaster.create({
                title: messageError,
                type: "error",
            });

        } else {
            toaster.create({
                title: messageNoCredentialResponse,
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

    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Login</Dialog.Title>
                            </Dialog.Header >
                            <Box >
                                <Tag.Root
                                    m="6"
                                    mb="4"
                                    mt="-1"
                                    w="90%"
                                    fontWeight="normal"
                                    fontSize={12}
                                >
                                    <Tag.Label lineClamp="2">
                                        Exhibition Platform never uses your email or any other personal data — only your first name.
                                    </Tag.Label>
                                </Tag.Root>
                            </Box>
                            <Dialog.Body position="relative">
                                <AbsoluteCenter w="100%">
                                    <Box w="90%">
                                        <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                                    </Box>
                                </AbsoluteCenter>
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