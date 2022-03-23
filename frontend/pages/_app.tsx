import type { AppProps } from "next/app"
import { ChakraProvider } from "@chakra-ui/react"
import Router from "next/router"
import NProgress from "nprogress" //nprogress module
import "nprogress/nprogress.css" //styles of nprogress
import "../styles/globals.css"

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start())
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

import React from "react"
import { AuthProvider } from "../auth/context"
React.useLayoutEffect = React.useEffect

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
