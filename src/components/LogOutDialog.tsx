import { googleLogout } from "@react-oauth/google"
import { useContext, useState, useEffect } from "react";
import { removeGoogleToken } from "@/utils/Auth";
import { AuthContext } from "@/context/AuthContext";
import { getUserDetails } from "@/utils/Exhibitions";
import { Toaster } from "./ui/toaster";
import {
    Button,
    AbsoluteCenter,
    Portal,
    Dialog,
    CloseButton
} from "@chakra-ui/react"

type LogOutDialogProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setMobileNavbarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function LogOutDialog({ open, setOpen, setMobileNavbarOpen }: LogOutDialogProps) {
    const [name, setName] = useState<string>("");
    const { isUserAuthenticated, setIsUserAuthenticated } = useContext(AuthContext);

    function handleLogout() {
        removeGoogleToken();
        googleLogout();
        setIsUserAuthenticated(false);
        window.location.reload()
    };

    useEffect(() => {
        getUserDetails()
            .then((data) => {
                setName(data.first_name);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [isUserAuthenticated]);


    return (
        <>
            <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.Header>
                                < Dialog.Title > Hi {name}!</Dialog.Title >
                            </Dialog.Header >
                            <Dialog.Body position="relative">
                                <AbsoluteCenter w="100%">
                                    <Button w="90%" variant="outline" onClick={handleLogout}>
                                        Log out
                                    </Button>
                                </AbsoluteCenter>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Dialog.ActionTrigger asChild>
                                    <Button mt="2" variant="outline">
                                        Cancel
                                    </Button>
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