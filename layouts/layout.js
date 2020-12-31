import Head from 'next/head'
import Container from "../components/container"
import Sidebar from './sidebar/sidebar' 
import { Box, Grid, Divider, Stack } from "@chakra-ui/react"
import PageTransition from "../components/page-transition.tsx"
import { ColorModeSwitcher } from '../components/ColorModeSwitcher'
import Header from "./header"
export default function Layout({ children }) {
  
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Grid p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
      </Grid> */}
      <Header></Header>
      <Container as="main" className="main-content">
        <Box display={{ base: "block", md: "flex" }}>
          <Sidebar />
          <Stack direction="row" p={8}>
            <Divider orientation="vertical" />
            <div style={{ flex: 1 }}>
              <Box
                id="content"
                pt={3}
                px={5}
                mt="4.5rem"
                mx="auto"
                maxW="48rem"
                minH="76vh"
              >
                <PageTransition>
                  {children}
                </PageTransition>
              </Box>
            </div>
          </Stack>  
        </Box>
      </Container>
    </>
  )
}
