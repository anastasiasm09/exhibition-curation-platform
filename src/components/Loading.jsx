import { Progress, Box } from "@chakra-ui/react"

export default function Loading() {
    return (
        <Box mt={8} aria-live="polite" role="status">
            <Progress.Root maxW='240' value={null}>
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>
        </Box>
    )
}