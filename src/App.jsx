import './App.css'
import { getAICArtworks } from './api/aic';
import { getHAMArtworks } from './api/ham';
import { useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Search from './components/Search';
import BannerImage from './components/BannerImage';
import HomepageArtworks from './components/HomepageArtworks';
import ErrorAlert from './components/ErrorAlert';
import { Box, VStack, VisuallyHidden } from '@chakra-ui/react';
import Loading from './components/Loading';



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

  //if (isDataAICArtworksLoading || isDataHAMArtworksLoading) return <p>Loading...</p>;


  const combinedArtworks = [
    ...(aicDataArtworks ?? []),
    ...(hamDataArtworks ?? [])
  ];

  /*   if (isDataAICArtworksLoading || isDataHAMArtworksLoading === false) {
      combinedArtworks
    } else {
      <Loading />
    } */

  //<HomepageArtworks artworks={combinedArtworks} />

  return (
    <main role="main">
      <Navbar />

      {/* Error Messages */}
      {(isDataAICArtworksError || isDataHAMArtworksError) && (
        <Box mt={8} px={4} aria-live="assertive" role="alert">
          <VStack spacing={3} mx="auto" w="100%">
            {isDataAICArtworksError && (
              <ErrorAlert message={messageAICError} />
            )}
            {isDataHAMArtworksError && (
              <ErrorAlert message={messageHAMError} />
            )}
          </VStack>
        </Box>
      )}

      {!isDataAICArtworksError && !isDataHAMArtworksError && <BannerImage />}

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
