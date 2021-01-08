import Head from 'next/head'
import Container from "../components/container"
import Header from "./header"
import Sidebar from './sidebar/sidebar' 
import { Box, Divider, HStack } from "@chakra-ui/react"
import PageTransition from "../components/page-transition.tsx"


export default function Layout({ children }) {  
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Grid> */}
      <Header />
      <Container as="main" className="main-content">
        <Box display={{ base: "block", md: "flex" }}>
          <Sidebar />
          <HStack pr={10} pt={10}>
            <Divider orientation="vertical" />
          </HStack>
          <Box  
            overflowX={{
              base: "auto", // 0-48em
              md: "none", // 48em-80em,
              xl: "none", // 80em+
            }}
            display="flex"
            px={[0,3,6,9]}
          >
            <Box
              id="content"
              pt={3}
              px={2}
              mt={[4,12,20]}
              mx="auto"
              maxW="52rem"
              minH="76vh"
            >
              <PageTransition>
                {children}
              </PageTransition>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  )
}
