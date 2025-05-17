import './App.css'
import { getAICArtworks } from './api/aic';
import { getHAMArtworks } from './api/ham';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Search from './components/Search';
import BannerImage from './components/BannerImage';
import HomepageArtworks from './components/HomepageArtworks';
import { Box, VisuallyHidden } from '@chakra-ui/react';
import Loading from './components/Loading';
import { Toaster, toaster } from "@/components/ui/toaster"
import { useEffect } from 'react';

function App() {


  const { data: aicDataArtworks, isLoading: isDataAICArtworksLoading, isError: isDataAICArtworksError } = useQuery({
    queryKey: ['aicData'],
    queryFn: () => getAICArtworks(),
  });

  const messageAICError = "Unable to load data from Art Institute of Chicago API. Please try again later."

  const { data: hamDataArtworks, isLoading: isDataHAMArtworksLoading, isError: isDataHAMArtworksError } = useQuery({
    queryKey: ['hamData'],
    queryFn: () => getHAMArtworks(),
  });

  const messageHAMError = "Unable to load data from Harvard Art Museums API. Please try again later."

  useEffect(() => {
    if (isDataAICArtworksError) {
        toaster.create({
          title: messageAICError,
          type: "error",
      })
    }
  }, [isDataAICArtworksError])

  useEffect(() => {
    if (isDataHAMArtworksError) {
        toaster.create({
          title: messageHAMError,
          type: "error",
      })
    }
  }, [isDataHAMArtworksError])


  const combinedArtworks = [
    ...(aicDataArtworks ?? []),
    ...(hamDataArtworks ?? [])
  ];

  return (
    <main role="main">
      {/* Error Messages */}
      <Toaster />

      <Navbar />

      <BannerImage />

      {/* Loading */}
      <Box aria-live="polite" role="status" mt={8}>
        {(isDataAICArtworksLoading || isDataHAMArtworksLoading) ? <Loading /> : <HomepageArtworks artworks={combinedArtworks} />}
        <VisuallyHidden>
          Loading artworks, please wait.
        </VisuallyHidden>
      </Box>


    </main>
  );
}

export default App
