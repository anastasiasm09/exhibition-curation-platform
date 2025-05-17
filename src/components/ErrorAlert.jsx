import { Alert, Box } from '@chakra-ui/react';

export default function ErrorAlert({ message }) {

    return (
        <Box aria-live="assertive" role="alert">
            <Alert.Root status="error" mx="auto" w="100%">
                <Alert.Indicator />
                <Alert.Content mx="auto" w="100%">
                    <Alert.Description>
                        {message}
                    </Alert.Description>
                </Alert.Content>
            </Alert.Root>
        </Box>
    )
}