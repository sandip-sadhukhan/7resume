import {
  Avatar,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react"
import NextLink from "next/link"
import React from "react"
import { AiOutlineProject } from "react-icons/ai"
import { BiCategory, BiSupport } from "react-icons/bi"
import {
  FaBriefcase,
  FaGraduationCap,
  FaHome,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa"
import { FiSettings, FiUser } from "react-icons/fi"
import { GiPowerButton } from "react-icons/gi"
import { ImBlogger } from "react-icons/im"
import { VscFeedback, VscProject } from "react-icons/vsc"
import NavItem from "./nav-item"
import {
  BsFillCalendar2EventFill,
  BsFillCalendarWeekFill,
  BsFillChatLeftTextFill,
} from "react-icons/bs"
import { MdPeopleAlt } from "react-icons/md"
import { RiUserStarFill } from "react-icons/ri"
import { IoIosPricetag } from "react-icons/io"
import { useRouter } from "next/router"

interface SidebarProps {
  onClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = (props: SidebarProps) => {
  const pathname = useRouter().pathname

  return (
    <VStack
      w="full"
      align="start"
      spacing={1}
      h="100vh"
      overflowY="auto"
      as="aside"
      bgColor="blackAlpha.800"
      pb={10}
      className="custom-scrollbar"
    >
      {/* Header */}
      <VStack
        py={6}
        px={8}
        w="full"
        pos="relative"
        bgColor="blackAlpha.200"
        align="start"
      >
        {/* Close Btn */}
        {props.onClose && (
          <Flex pos="absolute" top={5} right={5}>
            <FaTimes onClick={props.onClose} color="white" fontSize={18} />
          </Flex>
        )}

        {/* Profile Pic & Role */}
        <NextLink href="/dashboard/edit-profile" passHref>
          <HStack
            as={Link}
            w="full"
            spacing={4}
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
          >
            <Avatar src="/avatar-1.jpg" size="lg" border="4px solid gray" />
            <VStack align="start" spacing={1}>
              <Heading
                size="md"
                fontWeight="normal"
                letterSpacing="wide"
                color="white"
              >
                Sandip Sadhukhan
              </Heading>
              <Text color="whiteAlpha.700" fontSize={14}>
                Admin Role
              </Text>
            </VStack>
          </HStack>
        </NextLink>
      </VStack>

      {/* Edit Profile */}
      <HStack
        px={3}
        w="full"
        bgColor="blackAlpha.200"
        color="whiteAlpha.700"
        fontSize={14}
      >
        {/* Edit Profile */}
        <NextLink href="/dashboard/edit-profile" passHref>
          <Flex
            as={Link}
            flex={1}
            py={2}
            justifyContent="center"
            _hover={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
            color={
              pathname == "/dashboard/edit-profile" ? "white" : "whiteAlpha.700"
            }
            role="group"
            cursor="pointer"
          >
            <HStack _groupHover={{ color: "white" }}>
              <FiUser />
              <Text _groupHover={{ color: "white" }}>Edit Profile</Text>
            </HStack>
          </Flex>
        </NextLink>

        {/* Logout */}
        <HStack
          _hover={{ color: "white" }}
          px={3}
          py={2}
          cursor="pointer"
          onClick={() => alert("Logging out...")}
        >
          <GiPowerButton />
        </HStack>
      </HStack>

      {/* Menus */}
      <VStack
        w="full"
        align="start"
        py={5}
        color="whiteAlpha.700"
        fontSize={13}
        fontWeight="normal"
        spacing={2}
      >
        <NavItem Icon={FaHome} text="Dashboard" link="/dashboard" />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={FiSettings} text="Settings" link="/dashboard/settings" />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={FaUserAlt} text="About Me" link="/dashboard/about-me" />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={BiSupport} text="Services" link="/dashboard/services" />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem
          Icon={IoIosPricetag}
          text="Pricing Plans"
          link="/dashboard/pricing-plans"
        />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem
          Icon={FaGraduationCap}
          text="Education"
          link="/dashboard/education"
        />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem
          Icon={FaBriefcase}
          text="Experiences"
          link="/dashboard/experiences"
        />

        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={AiOutlineProject} text="Projects" link="#">
          <>
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={BiCategory}
              text="Projects Categories"
              link="/dashboard/projects/categories"
            />
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={VscProject}
              text="Projects"
              link="/dashboard/projects"
            />
          </>
        </NavItem>

        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={ImBlogger} text="Blog" link="#">
          <>
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={BiCategory}
              text="Blog Categories"
              link="/dashboard/blog-categories"
            />
            <Divider borderColor="whiteAlpha.200" />
            <NavItem Icon={ImBlogger} text="Blog" link="/dashboard/blog" />
          </>
        </NavItem>

        <Divider borderColor="whiteAlpha.200" />

        <NavItem Icon={RiUserStarFill} text="Skills" link="#">
          <>
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={BiCategory}
              text="Skills Categories"
              link="/dashboard/skills-categories"
            />
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={RiUserStarFill}
              text="Skills"
              link="/dashboard/skills"
            />
          </>
        </NavItem>

        <Divider borderColor="whiteAlpha.200" />
        <NavItem
          Icon={VscFeedback}
          text="Testimonials"
          link="/dashboard/testimonials"
        />
        <Divider borderColor="whiteAlpha.200" />
        <NavItem Icon={MdPeopleAlt} text="Clients" link="/dashboard/clients" />
        <Divider borderColor="whiteAlpha.200" />

        <NavItem
          Icon={BsFillChatLeftTextFill}
          text="Messages"
          link="/dashboard/messages"
        />
        <Divider borderColor="whiteAlpha.200" />

        {/* Appointments */}
        <NavItem Icon={BsFillCalendar2EventFill} text="Appointments" link="#">
          <>
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={BsFillCalendarWeekFill}
              text="Appointments"
              link="/dashboard/appointments"
            />
            <Divider borderColor="whiteAlpha.200" />
            <NavItem
              Icon={BsFillCalendar2EventFill}
              text="Requested Appointments"
              link="/dashboard/requested-appointments"
            />
          </>
        </NavItem>
      </VStack>
    </VStack>
  )
}

export default Sidebar
