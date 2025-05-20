import './App.css'
import { getAICArtworks } from './api/aic';
import { getHAMArtworks } from './api/ham';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Search from './components/Search';
import BannerImage from './components/BannerImage';
import HomepageArtworks from './components/HomepageArtworks';
import { Box, VisuallyHidden } from '@chakra-ui/react';
import Loading from './components/Loading';
import { Toaster, toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';



function App() {

  const {
    data: aicDataArtworks,
    isLoading: isDataAICArtworksLoading,
    isError: isDataAICArtworksError,
    fetchNextPage: fetchNextAICArtworksPage,
  } = useInfiniteQuery({
    queryKey: ['aicData'],
    queryFn: ({pageParam = 1}) => getAICArtworks(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  })

  const messageAICError = "Unable to load data from Art Institute of Chicago API. Please try again later."

  const {
    data: hamDataArtworks,
    isLoading: isDataHAMArtworksLoading,
    isError: isDataHAMArtworksError,
    fetchNextPage: fetchNextHAMArtworksPage,
  } = useInfiniteQuery({
    queryKey: ['hamData'],
    queryFn: ({ pageParam = 1 }) => getHAMArtworks(pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
  })

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

  const [combinedArtworks, setCombinedArtworks] = useState([])

  useEffect(() => {
    setCombinedArtworks((aicDataArtworks?.pages ?? []).concat(hamDataArtworks?.pages ?? []).flatMap(page => page.artworks))
  }, [isDataAICArtworksLoading, isDataHAMArtworksLoading])

  const { ref, inView, entry } = useInView({
  });

  useEffect(() => {
    if (inView === true) {
      Promise.all([fetchNextAICArtworksPage(), fetchNextHAMArtworksPage()]).then((result) => {
        const aicPages = result[0].data.pages
        const hamPages = result[1].data.pages

        let artworks = []
        aicPages.forEach((aicData, i) => {
          const hamData = hamPages[i]
          artworks.push(aicData.artworks)
          artworks.push(hamData.artworks)
        })
        artworks = artworks.flat()
        setCombinedArtworks(artworks)
      })
    }
  }, [inView])
  
  console.log(combinedArtworks)

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

      {/* Infinite scroll */}
      {!isDataAICArtworksLoading && !isDataHAMArtworksLoading && (
        <div ref={ref}>
        </div>
      )}
    </main>
  );
}

export default App
