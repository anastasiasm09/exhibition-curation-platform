import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { getAICArtworks } from './api/aic';
import { getHAMArtworks } from './api/ham';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BannerImage from './components/BannerImage';
import HomepageArtworks from './components/HomepageArtworks';
import Exhibitions from './components/Exhibitions';
import { Box, VisuallyHidden } from '@chakra-ui/react';
import Loading from './components/Loading';
import { Toaster, toaster } from "@/components/ui/toaster"
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient } from '@tanstack/react-query';
import ExhibitionDetails from './components/ExhibitionDetails';
import About from './components/About';


function App() {
  const [search, setSearch] = useState(null);
  const [classification, setClassification] = useState(null);
  const queryClient = useQueryClient();

  const location = useLocation();
  const isHomePage = location.pathname === '/';


  const {
    data: aicDataArtworks,
    isLoading: isDataAICArtworksLoading,
    isError: isDataAICArtworksError,
    fetchNextPage: fetchNextAICArtworksPage,
  } = useInfiniteQuery({
    queryKey: ['aicData', search, classification],
    queryFn: ({ pageParam = 1 }) => getAICArtworks(pageParam, search, classification),
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
    queryKey: ['hamData', search, classification],
    queryFn: ({ pageParam = 1 }) => getHAMArtworks(pageParam, search, classification),
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
    <>
      <Navbar onSearch={setSearch} />

      {isHomePage && <BannerImage />}

      <Routes>
        {/* Loading */}
        <Route
          path="/"
          element={
            <Box aria-live="polite" role="status" mt={8}>
              {isLoading && (
                <>
                  <Loading />
                  <VisuallyHidden>
                    Loading artworks, please wait.
                  </VisuallyHidden>
                </>
              )}

              <HomepageArtworks artworks={combinedArtworks} onFilter={setClassification} />

              {/* Infinite scroll */}
              {!isLoading && !!combinedArtworks.length && (<div ref={ref}></div>)}
            </Box>
          }
        />
        <Route path="/exhibitions" element={<Exhibitions />} />
        <Route path="/exhibitions/:name" element={<ExhibitionDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Error Messages */}
      <Toaster />
    </>

  );
}

export default App
