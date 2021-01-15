import React from "react"

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  // 2. Use at the root of your app
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}
