import {
  Divider,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Text,
  useDisclosure,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import Head from "next/head"
import React, { useRef } from "react"
import { BsArrowUpCircle } from "react-icons/bs"
import IsAuth from "../hocs/is-auth"
import HeaderMenu from "./header-menu"
import Sidebar from "./sidebar"

interface layoutProps {
  currentMenu: string
  children: JSX.Element
}

const Layout: React.FC<layoutProps> = (props: layoutProps) => {
  const { currentMenu, children } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = useColorModeValue("gray.200", "gray.800")
  const footerColor = useColorModeValue("gray.600", "gray.500")
  const dividerWidth = useColorModeValue("2px", "1px")

  const mainContentDiv = useRef<HTMLDivElement | null>(null)

  const scrollTop = () => {
    console.log("click")
    if (mainContentDiv.current) {
      mainContentDiv.current.scrollTop = 0
    }
  }

  return (
    <IsAuth>
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
          align="start"
        >
          <VStack
            w="full"
            bgColor={bgColor}
            align="start"
            h="100vh"
            // maxH="fit-content"
            // overflow="hidden"
            spacing={0}
            overflowY="auto"
            className="custom-scrollbar-2"
            ref={mainContentDiv}
            scrollBehavior="smooth"
          >
            {/* Header Menu */}
            <HeaderMenu currentMenu={currentMenu} onOpen={onOpen} />

            <VStack
              as="section"
              w="full"
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
                <Divider borderWidth={dividerWidth} bgColor={footerColor} />
                <VStack as="footer" w="full" align="start">
                  <HStack
                    w="full"
                    align="start"
                    alignItems="center"
                    justifyContent="space-between"
                    px={5}
                  >
                    <Text fontSize={13} fontWeight={700} color={footerColor}>
                      &copy; Resume bus {new Date().getFullYear()}
                    </Text>
                    <BsArrowUpCircle
                      fontSize={18}
                      cursor="pointer"
                      onClick={() => scrollTop()}
                    />
                  </HStack>
                </VStack>
              </VStack>
              {/* content end */}
            </VStack>
          </VStack>
        </VStack>
        <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
          <DrawerOverlay />
          <DrawerContent>
            <Sidebar onClose={onClose} />
          </DrawerContent>
        </Drawer>
      </HStack>
    </IsAuth>
  )
}

export default Layout
