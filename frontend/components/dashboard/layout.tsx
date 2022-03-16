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
      {/* SEO */}
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </Head>

      <HStack w="full" align="start" spacing={0}>
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
          bgColor="gray.200"
          align="start"
          h="100vh"
          maxH="fit-content"
          overflow="hidden"
          spacing={0}
        >
          {/* Header Menu */}
          <HeaderMenu currentMenu={currentMenu} onOpen={onOpen} />

          <VStack
            as="section"
            w="full"
            h="100vh"
            overflowY="auto"
            className="custom-scrollbar-2"
            py={[4, 4, 4, 6, 6]}
            align="start"
            spacing={[5, 5, 5, 10, 10]}
          >
            {/* Main Content */}
            <VStack w="full" px={[3, 3, 5, 8, 8]}>
              {children}
            </VStack>

            {/* Footer */}
            <VStack w="98%">
              <Divider borderWidth="2px" bgColor="gray.400" />
              <VStack as="footer" w="full" align="start">
                <Text fontSize={13} px={5} fontWeight={700} color="gray.700">
                  &copy; Resume bus {new Date().getFullYear()}
                </Text>
              </VStack>
            </VStack>
            {/* content end */}
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
