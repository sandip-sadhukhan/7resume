import React from "react"
import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { AiFillContacts } from "react-icons/ai"
import { RiSuitcaseLine } from "react-icons/ri"
import Typed from "react-typed"
import { useRouter } from "next/router"
import Link from "next/link"

interface HomeSectionProps {
  name: string
  professionList: string[]
  startPageBackground: string
}

const HomeSection: React.FC<HomeSectionProps> = ({
  name,
  professionList,
  startPageBackground,
}: HomeSectionProps) => {
  const username = useRouter().query.username as string
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL

  return (
    <Center
      w="100%"
      minH="100vh"
      as="main"
      overflowY="auto"
      px={[3, 5, 10]}
      id="main-page-full-image"
      style={{
        background: `linear-gradient(to right, #000000ad, #434343ab), url(${BASE_API_URL}${startPageBackground})`,
        backgroundSize: "cover !important",
      }}
    >
      <Flex flexDir="column" w="full" align="center">
        <Heading
          color="white"
          as="h3"
          fontWeight={200}
          fontSize={[20, 25, 30, 35, 45]}
        >
          Hello I&apos;m {name}
        </Heading>
        <Flex
          flexDir={["column", "column", "column", "row", "row"]}
          align="center"
        >
          <Heading
            as="h2"
            color="white"
            fontWeight={300}
            fontSize={[30, 45, 55, 60, 70]}
          >
            I&apos;m working as
          </Heading>
          <Heading
            ml={3}
            as="h2"
            color="white"
            fontWeight={600}
            fontSize={[30, 45, 55, 60, 70]}
          >
            <Typed strings={professionList} typeSpeed={70} loop />
          </Heading>
        </Flex>
        <HStack spacing={8} mt={10}>
          <Link href={`/u/${username}/contact-me`}>
            <a>
              <Button variant="solid" color="white" bgColor={secondaryColor}>
                <AiFillContacts fontSize={20} />
                <Text ml={2}>Contact Me</Text>
              </Button>
            </a>
          </Link>
          <Link href={`/u/${username}/contact-me`}>
            <a>
              <Button variant="solid" color="white" bgColor={secondaryColor}>
                <RiSuitcaseLine fontSize={20} />
                <Text ml={2}>Hire Me</Text>
              </Button>
            </a>
          </Link>
        </HStack>
      </Flex>
    </Center>
  )
}

export default HomeSection
