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
import { SidebarProps } from "../../../types/profile"

interface MobileSidebarProps extends SidebarProps {
  onClose: () => void
}

const MobileSidebar: React.FC<MobileSidebarProps> = (
  props: MobileSidebarProps
) => {
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
      <Flex w="full" onClick={props.onClose} justifyContent="end">
        <IconButton
          bgColor="transparent"
          icon={<FaTimes />}
          aria-label="Close"
        />
      </Flex>
      <Flex w="full" flexDir="column" align="center" zIndex={10}>
        <Avatar
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.profile_picture}`}
          border={`2px solid ${colorMode === "light" ? "#F98127" : "#009BFF"}`}
        />
        <Heading
          as="h1"
          size="xs"
          mt={3}
          textTransform="uppercase"
          fontWeight={600}
        >
          {props.name}
        </Heading>
        <Text mt={1} fontSize="xs">
          <Typed
            strings={props.my_positions.split("\r\n")}
            typeSpeed={70}
            loop
          />
        </Text>
        <Flex onClick={toggleColorMode}>
          <IconButton
            bgColor={colorMode === "light" ? "gray.200" : "gray.800"}
            mt={3}
            aria-label="toggle color mode"
            rounded="full"
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
          link={`/u/${username}`}
          secondaryColor={secondaryColor}
          active={pathname === "/u/[username]"}
        />
        <NavItem
          title="About Me"
          NavIcon={FaUserTie}
          hoverColor={hoverColor}
          link={`/u/${username}/about-me`}
          secondaryColor={secondaryColor}
          active={pathname === "/u/[username]/about-me"}
        />
        {props.display_resume ? (
          <NavItem
            title="Resume"
            NavIcon={AiOutlineFilePdf}
            hoverColor={hoverColor}
            link={`/u/${username}/resume`}
            secondaryColor={secondaryColor}
            active={pathname === "/u/[username]/resume"}
          />
        ) : null}
        {props.display_portfolio ? (
          <NavItem
            title="Portfolio"
            NavIcon={BsFileEarmarkPostFill}
            hoverColor={hoverColor}
            link={`/u/${username}/portfolio`}
            secondaryColor={secondaryColor}
            active={pathname.startsWith("/u/[username]/portfolio")}
          />
        ) : null}
        {props.display_blog ? (
          <NavItem
            title="Blog"
            NavIcon={FaBloggerB}
            hoverColor={hoverColor}
            link={`/u/${username}/blog`}
            secondaryColor={secondaryColor}
            active={pathname.startsWith("/u/[username]/blog")}
          />
        ) : null}
        <NavItem
          title="Contact Me"
          NavIcon={AiFillContacts}
          hoverColor={hoverColor}
          link={`/u/${username}/contact-me`}
          secondaryColor={secondaryColor}
          active={pathname === "/u/[username]/contact-me"}
        />
        {props.display_appointments ? (
          <NavItem
            title="Appointments"
            NavIcon={BsFillCalendarDateFill}
            hoverColor={hoverColor}
            link={`/u/${username}/appointments`}
            secondaryColor={secondaryColor}
            active={pathname === "/u/[username]/appointments"}
          />
        ) : null}
      </Flex>
    </VStack>
  )
}

export default MobileSidebar
