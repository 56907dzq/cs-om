import Head from 'next/head'
import Container from "components/container"
import Header from "./header"
import Sidebar from './sidebar/sidebar' 
import { Box, Flex, Divider, HStack } from "@chakra-ui/react"
import PageTransition from "components/page-transition.tsx"


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
      <Container as="main" className="main-content" >
        <Box display={{ base: "block", md: "flex" }} >
          <Sidebar />
          <HStack pr={10} pt="5rem">
            <Divider orientation="vertical" />
          </HStack>  
          <Flex
            mt={[0,10,20]}
            shrink='0'
            grow='1'
            justifySelf="stretch"
            overflowX='auto'
            >
            <Box
              id="content"
              px={2}
              w='100%' 
              maxW="60rem"
              minH="76vh"
            >
              <PageTransition>
                {children}
              </PageTransition>
            </Box>
          </Flex>   
        </Box>
      </Container>
    </>
  )
}
