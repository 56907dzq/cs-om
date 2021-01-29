// adjust your pages/_document.js
import React from "react"
import { ColorModeScript } from "@chakra-ui/react"
import NextDocument, {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document"


export default class Document extends NextDocument {
  static getInitialProps(ctx) {
    return NextDocument.getInitialProps(ctx)
  }
  render() {
    return (
      <Html>
        <Head />
        
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode="light" />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}