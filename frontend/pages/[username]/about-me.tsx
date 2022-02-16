import {
  Divider,
  Flex,
  Text,
  Heading,
  HStack,
  SimpleGrid,
  useColorModeValue,
  VStack,
  Image,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import { BiMap } from "react-icons/bi"
import { FaBriefcase } from "react-icons/fa"

const AboutMe: NextPage = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.700", "gray.200")

  return (
    <Layout>
      <VStack
        align="start"
        pt={[5, 5, 5, 10, 10]}
        px={[5, 5, 5, 16, 16]}
        w="full"
      >
        <VStack align="center" w="full">
          <Heading mb={1} color={headingColor} fontWeight={600}>
            ABOUT ME
          </Heading>
          <Divider pt={1} w={40} bgColor={secondaryColor} />
        </VStack>
        <SimpleGrid pt={[1, 1, 5, 10, 10]} columns={[1, 1, 1, 2, 2]}>
          <VStack
            align={["center", "center", "center", "start", "start"]}
            pt={[5, 5, 5, 10, 10]}
          >
            <Heading size="md">Sandip Sadhukhan</Heading>
            <HStack>
              <BiMap />
              <Text colorScheme="blackAlpha">West Bengal, India</Text>
            </HStack>
            <Text pt={5} textAlign="justify">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo in,
              modi vero nulla odit maxime, fuga sequi, ex praesentium expedita
              esse voluptates. Non cumque, quasi amet suscipit iure fuga
              deserunt error obcaecati harum perferendis assumenda consequuntur
              aperiam cum vero pariatur earum! Sint, ea quos ab facilis suscipit
              beatae amet consequatur, ipsam
            </Text>
            <Text textAlign="justify">
              velit odio a eos expedita non quae, qui esse ipsum assumenda nihil
              facere cum sequi optio harum dolor reiciendis? Soluta tenetur quas
              ea optio ab? Ratione rerum odit explicabo magni amet provident hi.
            </Text>
            <SimpleGrid columns={[1, 1, 1, 3, 3]} pt={5} spacing={4}>
              <HStack spacing={3} alignContent="center">
                <Flex
                  bgColor={secondaryColor}
                  borderRadius="full"
                  p={3}
                  color="#fff"
                >
                  <FaBriefcase />
                </Flex>
                <VStack alignItems="start" spacing={0}>
                  <Text fontWeight={700} color={headingColor}>
                    5+ Years Job
                  </Text>
                  <Text fontSize={15}>Experience</Text>
                </VStack>
              </HStack>
              <HStack spacing={3} alignContent="center">
                <Flex
                  bgColor={secondaryColor}
                  borderRadius="full"
                  p={3}
                  color="#fff"
                >
                  <FaBriefcase />
                </Flex>
                <VStack alignItems="start" spacing={0}>
                  <Text fontWeight={700} color={headingColor}>
                    300+ Projects
                  </Text>
                  <Text fontSize={15}>Completed</Text>
                </VStack>
              </HStack>
              <HStack spacing={3} alignContent="center">
                <Flex
                  bgColor={secondaryColor}
                  borderRadius="full"
                  p={3}
                  color="#fff"
                >
                  <FaBriefcase />
                </Flex>
                <VStack alignItems="start" spacing={0}>
                  <Text fontWeight={700} color={headingColor}>
                    120+ Meetings
                  </Text>
                  <Text fontSize={15}>Successful</Text>
                </VStack>
              </HStack>
            </SimpleGrid>
          </VStack>
          <VStack>
            <Image src="/about-bg.png" alt="pc" />
          </VStack>
        </SimpleGrid>
      </VStack>
    </Layout>
  )
}

export default AboutMe
