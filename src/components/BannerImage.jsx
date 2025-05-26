import bannerImage from '../assets/bannerImage.webp'
import { Box, Image, Text } from '@chakra-ui/react';


export default function BannerImage() {

    return (
        <Box position="relative" height={{ base: "250px", md: "400px" }} width="100%">
        <Image
          src={bannerImage}
          alt="Art gallery banner"
          height={{ base: "250", md: "400px"}}
          width="100%"
          objectFit="cover"
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          color="white"
          width="100%"
          fontStretch="120%"
          //bg="rgba(255, 255, 255, 0.7)"
          px={{ base: 3, md: 6 }}
          py={{ base: 2, md: 3 }}

          textAlign="center"
        >
          <Text fontSize={{ base: "2xl", md: "5xl" }} fontWeight={{ base: "semibold", md: "bold" }} textAlign="center">
            Welcome to museum collections
          </Text>
          <Text fontStretch="120%" fontSize="lg" textAlign="center">Discover artworks</Text>
        </Box>
      </Box>
    )
}