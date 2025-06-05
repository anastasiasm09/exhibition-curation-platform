import bannerImage from '../assets/bannerImage.webp'
import { Box, Image, Text } from '@chakra-ui/react';


export default function BannerImage() {

  return (
    <Box position="relative" height={{ base: "250px", md: "400px" }} width="100%">
      <Image
        src={bannerImage}
        alt="Art gallery banner"
        height={{ base: "250", md: "400px" }}
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
        px={{ base: 3, md: 6 }}
        py={{ base: 2, md: 3 }}

        textAlign="center"
      >
        <Text
          letterSpacing={{ base: "0.9px", lg: "5px" }}
          fontSize={{ base: "xl", md: "4xl", lg: "5xl" }}
          fontWeight={{ base: "semibold", md: "bold" }}
          textAlign="center">
          Welcome to museum collections
        </Text>
        <Text
          letterSpacing={{ base: "0.4px", lg: "3px" }}
          fontSize={{ base: "11px", md: "17px", lg: "18px" }}
          fontWeight={{ base: "medium", md: "semibold" }}
          textAlign="center"
        >
          Discover artworks
        </Text>
      </Box>
    </Box>
  )
}