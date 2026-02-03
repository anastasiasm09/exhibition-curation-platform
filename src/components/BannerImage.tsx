import { Box, Text } from '@chakra-ui/react';
import { useBreakpointValue } from "@chakra-ui/react"

export default function BannerImage() {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box position="relative" >


      <video
        className="video"
        autoPlay={!isMobile}
        muted
        loop
      >
        <source src="12538533_1920_1080_30fps.mp4" type="video/mp4" />
      </video>


      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="black"
        opacity={0.3}
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
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight={{ base: "semibold", md: "semibold" }}
          lineHeight={{ base: "1.2", md: "1.3", lg: "1.4" }}
          textAlign="center">
          Welcome to museum collections
        </Text>
        <Text
          letterSpacing={{ base: "0.4px", lg: "3px" }}
          fontSize={{ base: "13px", md: "17px", lg: "18px" }}
          fontWeight={{ base: "normal", md: "medium" }}
          textAlign="center"
        >
          Explore Art. Curate Your Exhibition
        </Text>
      </Box>
    </Box>
  )
}