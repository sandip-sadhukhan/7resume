import {
  Avatar,
  Flex,
  Heading,
  HStack,
  useColorMode,
  VStack,
  useDisclosure,
  Drawer,
  DrawerContent,
  DrawerBody,
  DrawerOverlay,
} from "@chakra-ui/react"
import Sidebar from "./sidebar/Sidebar"
import MobileSidebar from "./sidebar/MobileSidebar"
import { MdMenu } from "react-icons/md"
import React from "react"
import { LayoutProps } from "../../types/profile"
import Head from "next/head"

interface Props {
  layoutProps: LayoutProps
  children: JSX.Element
}

const Layout = (props: Props) => {
  const { colorMode } = useColorMode()

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Head>
        <title>{props.layoutProps.site_title}</title>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content={props.layoutProps.meta_description} />
        <link
          rel="icon"
          type="image/png"
          href={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.layoutProps.favicon}`}
        />
      </Head>
      <HStack w="100vw" h="100vh" overflowX="hidden" align="start" spacing={0}>
        <VStack
          w="290px"
          minH="100vh"
          display={["none", "none", "none", "flex", "flex"]}
          pos="sticky"
          top={0}
        >
          <Sidebar
            name={props.layoutProps.name}
            profile_picture={props.layoutProps.profile_picture}
            my_positions={props.layoutProps.my_positions}
            display_resume={props.layoutProps.display_resume}
            display_portfolio={props.layoutProps.display_portfolio}
            display_blog={props.layoutProps.display_blog}
            display_appointments={props.layoutProps.display_appointments}
          />
        </VStack>
        <VStack flex={1} minH="100vh" p={0} m={0} spacing={0}>
          <Flex
            w="100%"
            h="60px"
            justifyContent="space-between"
            alignItems="center"
            display={["flex", "flex", "flex", "none", "none"]}
            bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
            px={5}
          >
            <HStack spacing={4}>
              <Avatar
                src="/avatar-1.jpg"
                border={`4px solid ${
                  colorMode === "light" ? "#F98127" : "#009BFF"
                }`}
              />
              <Heading as="h1" size="md" fontWeight={600}>
                Sandip Sadhukhan
              </Heading>
            </HStack>
            <Flex
              as="button"
              _hover={{
                cursor: "pointer",
              }}
              onClick={onOpen}
            >
              <MdMenu fontSize={30} />
            </Flex>
          </Flex>
          {props.children}
        </VStack>
      </HStack>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent w="full">
          <DrawerBody w="full" overflow="hidden">
            <MobileSidebar
              name={props.layoutProps.name}
              profile_picture={props.layoutProps.profile_picture}
              my_positions={props.layoutProps.my_positions}
              display_resume={props.layoutProps.display_resume}
              display_portfolio={props.layoutProps.display_portfolio}
              display_blog={props.layoutProps.display_blog}
              display_appointments={props.layoutProps.display_appointments}
              onClose={onClose}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Layout
