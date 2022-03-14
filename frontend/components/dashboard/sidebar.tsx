import {
  Avatar,
  Divider,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import Link from "next/link"
import React, { useState } from "react"
import { AiOutlineProject } from "react-icons/ai"
import { BiCategory, BiSupport } from "react-icons/bi"
import { FaBriefcase, FaGraduationCap, FaHome, FaUserAlt } from "react-icons/fa"
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
import { IoIosPricetag, IoMdArrowDropdown } from "react-icons/io"

const Sidebar = () => {
  const [projectDropdown, setProjectDropdown] = useState<boolean>(false)
  const [blogDropdown, setBlogDropdown] = useState<boolean>(false)
  const [skillDropdown, setSkillDropdown] = useState<boolean>(false)
  const [appointmentDropdown, setAppointmentDropdown] = useState<boolean>(false)

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
      <VStack py={8} px={8} w="full" bgColor="blackAlpha.200" align="start">
        <HStack w="full" spacing={4}>
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
      </VStack>

      {/* Edit Profile */}
      <HStack
        py={2}
        px={6}
        w="full"
        bgColor="blackAlpha.200"
        color="whiteAlpha.700"
        fontSize={14}
      >
        <Flex flex={1} justifyContent="center">
          <Link href="/dashboard/edit-profile">
            <a>
              <HStack>
                <FiUser />
                <Text>Edit Profile</Text>
              </HStack>
            </a>
          </Link>
        </Flex>
        <Link href="/logout">
          <a>
            <GiPowerButton />
          </a>
        </Link>
      </HStack>
      <VStack
        w="full"
        align="start"
        py={5}
        color="whiteAlpha.700"
        fontSize={13}
        fontWeight="normal"
        spacing={4}
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

        {/* Projects */}
        <HStack
          ps={12}
          w="full"
          align="start"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={() => setProjectDropdown(!projectDropdown)}
        >
          <Flex flex={1}>
            <HStack
              align="start"
              w="full"
              alignItems="center"
              spacing={3}
              _hover={{ color: "white" }}
            >
              <AiOutlineProject />
              <Text _hover={{ color: "white" }} color="whiteAlpha.700">
                Projects
              </Text>
            </HStack>
          </Flex>
          <Flex pe={10}>
            <IoMdArrowDropdown fontSize={18} />
          </Flex>
        </HStack>
        <VStack w="full" ps={10} display={projectDropdown ? "flex" : "none"}>
          <Divider borderColor="whiteAlpha.200" />
          <NavItem
            Icon={BiCategory}
            text="Projects Categories"
            link="/dashboard/projects-categories"
          />
          <Divider borderColor="whiteAlpha.200" />
          <NavItem
            Icon={VscProject}
            text="Projects"
            link="/dashboard/projects"
          />
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Blog */}
        <HStack
          ps={12}
          w="full"
          align="start"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={() => setBlogDropdown(!blogDropdown)}
        >
          <Flex flex={1}>
            <HStack
              align="start"
              w="full"
              alignItems="center"
              spacing={3}
              _hover={{ color: "white" }}
            >
              <ImBlogger />
              <Text _hover={{ color: "white" }} color="whiteAlpha.700">
                Blog
              </Text>
            </HStack>
          </Flex>
          <Flex pe={10}>
            <IoMdArrowDropdown fontSize={18} />
          </Flex>
        </HStack>
        <VStack w="full" ps={10} display={blogDropdown ? "flex" : "none"}>
          <Divider borderColor="whiteAlpha.200" />
          <NavItem
            Icon={BiCategory}
            text="Blog Categories"
            link="/dashboard/blog-categories"
          />
          <Divider borderColor="whiteAlpha.200" />
          <NavItem Icon={ImBlogger} text="Blog" link="/dashboard/blog" />
        </VStack>

        <Divider borderColor="whiteAlpha.200" />

        {/* Skills */}
        <HStack
          ps={12}
          w="full"
          align="start"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={() => setSkillDropdown(!skillDropdown)}
        >
          <Flex flex={1}>
            <HStack
              align="start"
              w="full"
              alignItems="center"
              spacing={3}
              _hover={{ color: "white" }}
            >
              <RiUserStarFill />
              <Text _hover={{ color: "white" }} color="whiteAlpha.700">
                Skills
              </Text>
            </HStack>
          </Flex>
          <Flex pe={10}>
            <IoMdArrowDropdown fontSize={18} />
          </Flex>
        </HStack>
        <VStack w="full" ps={10} display={skillDropdown ? "flex" : "none"}>
          <Divider borderColor="whiteAlpha.200" />
          <NavItem
            Icon={BiCategory}
            text="Skills Categories"
            link="/dashboard/skills-categories"
          />
          <Divider borderColor="whiteAlpha.200" />
          <NavItem Icon={ImBlogger} text="Skills" link="/dashboard/skills" />
        </VStack>

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
        <HStack
          ps={12}
          w="full"
          align="start"
          cursor="pointer"
          _hover={{ color: "white" }}
          onClick={() => setAppointmentDropdown(!appointmentDropdown)}
        >
          <Flex flex={1}>
            <HStack
              align="start"
              w="full"
              alignItems="center"
              spacing={3}
              _hover={{ color: "white" }}
            >
              <BsFillCalendarWeekFill />
              <Text _hover={{ color: "white" }} color="whiteAlpha.700">
                Appointments
              </Text>
            </HStack>
          </Flex>
          <Flex pe={10}>
            <IoMdArrowDropdown fontSize={18} />
          </Flex>
        </HStack>
        <VStack
          w="full"
          ps={10}
          display={appointmentDropdown ? "flex" : "none"}
        >
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
        </VStack>
      </VStack>
    </VStack>
  )
}

export default Sidebar
