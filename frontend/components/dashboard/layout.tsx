import {
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import HeaderMenu from "./header-menu"
import Sidebar from "./sidebar"

interface layoutProps {
  currentMenu: string
  children: JSX.Element
}

const Layout: React.FC<layoutProps> = (props: layoutProps) => {
  const { currentMenu, children } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <HStack w="full" align="start" spacing={0}>
        {/* SEO */}
        <Head>
          <meta charSet="UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/png" />
        </Head>

        {/* Sidebar */}
        <VStack
          w="22%"
          align="start"
          display={["none", "none", "none", "flex", "flex"]}
        >
          <Sidebar />
        </VStack>

        {/* Main Section */}
        <VStack
          as="main"
          w={["100%", "100%", "100%", "78%", "78%"]}
          minH="100vh"
          bgColor="gray.200"
          align="start"
        >
          {/* Header Menu */}
          <HeaderMenu currentMenu={currentMenu} onOpen={onOpen} />

          {/* Main Content */}
          <VStack as="section" w="full" minH="75vh" px={8} py={6} align="start">
            {children}
          </VStack>

          <Divider borderWidth="2px" bgColor="gray.400" w="99%" />

          {/* Footer */}
          <VStack as="footer" px={5} py={2} w="full" align="start">
            <Text fontSize={13} fontWeight={700} color="gray.700">
              &copy; Resume bus {new Date().getFullYear()}
            </Text>
          </VStack>
        </VStack>
      </HStack>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Layout
