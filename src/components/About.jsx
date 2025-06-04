import { Box, Heading, Text, Image, Stack, Flex } from "@chakra-ui/react"
import artInstituteLogo from '../assets/artic.svg';
import harvardLogo from '../assets/ham.svg';
import chakraLogo from '../assets/chakra.svg';
import reactLogo from '../assets/react.svg';
import renderLogo from '../assets/render.png'


export default function About() {

    return (
        <>
            <Box>
                <Heading as="h2" size="2xl" mt={4} mb={6} textAlign="center">
                    About the Project
                </Heading>
            </Box>
            <Text fontSize="md" mb={4}>
                <strong>Art Platform</strong> is a modern web application designed to help users explore, curate,
                and organize art exhibitions in an intuitive and visually engaging way.
            </Text>
            <Heading as="h2" size="2xl"  textAlign="center">
                Data Sources
            </Heading>
            <Flex align="center" justify="center" gap={14} mb={2}>
                <Image src={artInstituteLogo} alt="Art Institute of Chicago" boxSize="50px" objectFit="contain" />
                <Image src={harvardLogo} alt="Harvard Art Museums" maxW="100px" h="100px" objectFit="contain" />
            </Flex>
            <Text fontSize="md">
                The platform integrates artworks and metadata from leading museum collections via their public APIs:
            </Text>
            <Text fontSize="md" mb={4}>
                <strong>The Art Institute of Chicago API</strong> — providing access to a rich database of artworks, images, and curatorial information from one of the largest art museums in the United States.
            </Text>
            <Text fontSize="md" mb={4}>
                <strong>The Harvard Art Museums API</strong> — offering detailed records of thousands of artworks, media files, techniques, and artist data from Harvard University's renowned collections.
                By combining these robust resources, the platform empowers users to browse diverse collections, filter artworks by various criteria, and assemble personalized exhibitions directly in the browser.
            </Text>
            <Heading as="h2" size="2xl" mt={4} textAlign="center">
                Technologies Used
            </Heading>
            <Flex
                gap={10}
                direction="row"
                align="center"
                justify="center"
                wrap="wrap"
            >
                <Image src={reactLogo} alt="React" boxSize="40px" objectFit="contain" />
                <Image src={chakraLogo} alt="Chakra UI" boxSize="100px" objectFit="contain" />
                <Image src={renderLogo} alt="Render" boxSize="100px" objectFit="contain" />
            </Flex>
            <Text fontSize="md" mb={4}>
                The application is built with modern technologies including <strong>React</strong> for UI,
                <strong>Chakra UI</strong> for design components, and <strong>React Query</strong> for data fetching.
                The project is deployed on <strong>Render</strong>, a cloud platform for hosting web apps.
            </Text >
        </>

    )
}