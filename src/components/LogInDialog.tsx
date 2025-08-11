import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import { useContext, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { setGoogleToken } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";
import { getUserDetails } from "@/utils/Exhibitions";
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
    const [loginStatus, setLoginStatus] = useState<"success" | "error" | null>(null);
    const messageSuccess = "You have successfully logged in.";
    const messageNoCrRes = "No credential received.";
    const messageError = "Login failed";
    const [name, setName] = useState<string>("");

    const { setIsUserAuthenticated } = useContext(AuthContext);

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setGoogleToken(response.credential)
            setOpen(false)
            setMobileNavbarOpen?.(false)
            setIsUserAuthenticated(true)

            getUserDetails()
                .then((data) => setName(data.first_name))
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
                            <Tag.Root m="6" mb="4" mt="-1" fontWeight="normal" fontSize={12}>
                                <Tag.Label>Exhibition Platform does not use your email address, it only stores your first name.</Tag.Label>
                            </Tag.Root>
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