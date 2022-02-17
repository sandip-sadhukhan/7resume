import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react"

import { MdNightlight } from "react-icons/md"
import {
  BsSunFill,
  BsFileEarmarkPostFill,
  BsFillCalendarDateFill,
} from "react-icons/bs"
import { AiFillHome, AiOutlineFilePdf, AiFillContacts } from "react-icons/ai"
import { FaUserTie, FaBloggerB } from "react-icons/fa"

import Typed from "react-typed"
import NavItem from "./NavItem"
import { useRouter } from "next/router"

const Sidebar = () => {
  const { pathname, query } = useRouter()
  const username = query.username as string

  const { colorMode, toggleColorMode } = useColorMode()
  const headerGradient = useColorModeValue(
    "linear(to-r, #fc4a1a, #f7b733)",
    "linear(to-r, #0072ff, #00c6ff)"
  )

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")

  const hoverColor = useColorModeValue(
    "rgba(247, 183, 51, 0.5)",
    "rgba(0, 198, 255, 0.5)"
  )

  return (
    <VStack
      w="100%"
      minH="100vh"
      as="nav"
      bgColor={colorMode === "light" ? "gray.100" : "gray.700"}
      overflowY="auto"
      borderRight={`5px solid ${colorMode === "light" ? "#f7b733" : "#00c6ff"}`}
    >
      <Flex
        w="full"
        h="25%"
        bgGradient={headerGradient}
        alignItems="center"
        justifyContent="center"
        id="headerSidebar"
        pos="absolute"
      />
      <Flex w="full" flexDir="column" align="center" zIndex={10} pt={100}>
        <Avatar
          size="xl"
          src="/avatar-1.jpg"
          border={`8px solid ${colorMode === "light" ? "#F98127" : "#009BFF"}`}
        />
        <Heading
          as="h1"
          size="md"
          mt={3}
          textTransform="uppercase"
          fontWeight={600}
        >
          Sandip Sadhukhan
        </Heading>
        <Text mt={2}>
          <Typed
            strings={["Programmer", "Developer", "Engineer"]}
            typeSpeed={70}
            loop
          />
        </Text>
        <Flex onClick={toggleColorMode}>
          <Tooltip
            label={`Toogle ${
              colorMode === "light" ? "Dark Mode" : "Light Mode"
            }`}
            placement="right"
          >
            <IconButton
              bgColor={colorMode === "light" ? "gray.200" : "gray.800"}
              mt={3}
              aria-label="toggle color mode"
              icon={
                colorMode === "light" ? (
                  <MdNightlight color="gray.800" />
                ) : (
                  <BsSunFill />
                )
              }
            />
          </Tooltip>
        </Flex>
      </Flex>
      <Flex w="full" pl={10} flexDir="column" gap={1}>
        <NavItem
          title="Home"
          NavIcon={AiFillHome}
          hoverColor={hoverColor}
          link={`/${username}`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]"}
        />
        <NavItem
          title="About Me"
          NavIcon={FaUserTie}
          hoverColor={hoverColor}
          link={`/${username}/about-me`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]/about-me"}
        />
        <NavItem
          title="Resume"
          NavIcon={AiOutlineFilePdf}
          hoverColor={hoverColor}
          link={`/${username}/resume`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]/resume"}
        />
        <NavItem
          title="Portfolio"
          NavIcon={BsFileEarmarkPostFill}
          hoverColor={hoverColor}
          link={`/${username}/portfolio`}
          secondaryColor={secondaryColor}
          active={pathname === "/portfolio"}
        />
        <NavItem
          title="Blog"
          NavIcon={FaBloggerB}
          hoverColor={hoverColor}
          link={`/${username}/blog`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]/blog"}
        />
        <NavItem
          title="Contact Me"
          NavIcon={AiFillContacts}
          hoverColor={hoverColor}
          link={`/${username}/contact-me`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]/contact-me"}
        />
        <NavItem
          title="Appointments"
          NavIcon={BsFillCalendarDateFill}
          hoverColor={hoverColor}
          link={`/${username}/appointments`}
          secondaryColor={secondaryColor}
          active={pathname === "/[username]/appointments"}
        />
      </Flex>
    </VStack>
  )
}

export default Sidebar
