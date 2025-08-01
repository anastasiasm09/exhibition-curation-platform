import { CredentialResponse, GoogleLogin } from "@react-oauth/google"
import {
    IconButton,
    Portal,
    Dialog,
    Button,
    CloseButton, HStack, Status,
} from "@chakra-ui/react"
import { RiAccountCircleLine } from "react-icons/ri";
import { useContext, useState } from "react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { setGoogleToken } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";


export default function UserProfileButton() {
    const [open, setOpen] = useState<boolean>(false);
    const [loginStatus, setLoginStatus] = useState<"success" | "error" | null>(null);
    const messageSuccess = "You have successfully logged in.";
    const messageNoCrRes = "No credential received.";
    const messageError = "Login failed";

    const { setIsUserAuthenticated } = useContext(AuthContext)

    const handleSuccess = (response: CredentialResponse) => {
        if (response.credential) {
            setGoogleToken(response.credential)
            setOpen(false)
            setIsUserAuthenticated(true)
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
                <Dialog.Trigger asChild>
                    <IconButton
                        aria-label="Login"
                        size="sm"
                        color={loginStatus === "success" ? "maroon" : "black"}
                        bg="gray.100"
                    >
                        <RiAccountCircleLine />
                        
                    </IconButton>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                <Dialog.Title>Login</Dialog.Title>
                            </Dialog.Header>
                            <Dialog.Body>
                                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button variant="outline">Cancel</Button>
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