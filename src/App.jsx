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
  const [search, setSearch] = useState(null);

  const {
    data: aicDataArtworks,
    isLoading: isDataAICArtworksLoading,
    isError: isDataAICArtworksError,
    fetchNextPage: fetchNextAICArtworksPage,
  } = useInfiniteQuery({
    queryKey: ['aicData', search],
    queryFn: ({ pageParam = 1 }) => getAICArtworks(pageParam, search),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    retry: 1
  })

  const messageAICError = "Unable to load data from Art Institute of Chicago API. Please try again later."

  const {
    data: hamDataArtworks,
    isLoading: isDataHAMArtworksLoading,
    isError: isDataHAMArtworksError,
    fetchNextPage: fetchNextHAMArtworksPage,
  } = useInfiniteQuery({
    queryKey: ['hamData', search],
    queryFn: ({ pageParam = 1 }) => getHAMArtworks(pageParam, search),
    getNextPageParam: (lastPage) => {
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
    initialPageParam: 1,
    retry: 1
  })

  const isLoading = isDataAICArtworksLoading || isDataHAMArtworksLoading

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
    if (!isLoading) {
      setCombinedArtworks((aicDataArtworks?.pages ?? []).concat(hamDataArtworks?.pages ?? []).flatMap(page => page.artworks))
    }
  }, [isLoading])

  const { ref, inView, entry } = useInView({
  });

  useEffect(() => {
    if (inView === true) {
      Promise.all([fetchNextAICArtworksPage(), fetchNextHAMArtworksPage()]).then((result) => {
        const aicResult = result[0]
        const hamResult = result[1]

        const aicPages = aicResult.data?.pages
        const hamPages = hamResult.data?.pages

        let artworks = []

        if (aicPages && hamPages) {
          aicPages.forEach((aicData, i) => {
            const hamData = hamPages[i]
            if (aicData?.artworks) {
              artworks.push(aicData.artworks)
            }
            
            if (hamData?.artworks)
              artworks.push(hamData.artworks)
          });

          artworks = artworks.flat();

        } else if (aicPages) {
          artworks = aicPages
        } else if (hamPages) {
          artworks = hamPages
        }

        setCombinedArtworks(artworks)
      })
    }
  }, [inView])


  return (
    <main role="main">
      {/* Error Messages */}
      <Toaster />

      <Navbar onSearch={setSearch} />

      <BannerImage />

      {/* Loading */}
      <Box aria-live="polite" role="status" mt={8}>
        {isLoading && (
          <>
            <Loading />
            <VisuallyHidden>
              Loading artworks, please wait.
            </VisuallyHidden>
          </>
        )}

        <HomepageArtworks artworks={combinedArtworks} />
      </Box>

      {/* Infinite scroll */}
      {!isLoading && !!combinedArtworks.length && (
        <div ref={ref}>
        </div>
      )}
    </main>
  );
}

export default App
