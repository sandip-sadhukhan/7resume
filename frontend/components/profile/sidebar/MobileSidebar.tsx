import {
  Avatar,
  Flex,
  Heading,
  IconButton,
  Text,
  VStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"

import { MdNightlight } from "react-icons/md"
import {
  BsSunFill,
  BsFileEarmarkPostFill,
  BsFillCalendarDateFill,
} from "react-icons/bs"
import { AiFillHome, AiOutlineFilePdf, AiFillContacts } from "react-icons/ai"
import { FaUserTie, FaBloggerB, FaTimes } from "react-icons/fa"

import Typed from "react-typed"
import NavItem from "./NavItem"
import { useRouter } from "next/router"

const MobileSidebar = ({ onClose }: { onClose: () => void }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  const { pathname, query } = useRouter()
  const username = query.username as string

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
      pos="absolute"
      left={0}
      top={0}
    >
      <Flex w="full" onClick={onClose} justifyContent="end">
        <IconButton icon={<FaTimes />} aria-label="Close" />
      </Flex>
      <Flex w="full" flexDir="column" align="center" zIndex={10}>
        <Avatar
          src="/avatar-1.jpg"
          border={`2px solid ${colorMode === "light" ? "#F98127" : "#009BFF"}`}
        />
        <Heading
          as="h1"
          size="xs"
          mt={3}
          textTransform="uppercase"
          fontWeight={600}
        >
          Sandip Sadhukhan
        </Heading>
        <Text mt={1} fontSize="xs">
          <Typed
            strings={["Programmer", "Developer", "Engineer"]}
            typeSpeed={70}
            loop
          />
        </Text>
        <Flex onClick={toggleColorMode}>
          <IconButton
            bgColor={colorMode === "light" ? "gray.200" : "gray.800"}
            mt={3}
            aria-label="toggle color mode"
            size="xs"
            icon={
              colorMode === "light" ? (
                <MdNightlight color="gray.800" />
              ) : (
                <BsSunFill />
              )
            }
          />
        </Flex>
      </Flex>
      <Flex w="full" overflowY="auto" pl={10} flexDir="column" gap={1}>
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

export default MobileSidebar
