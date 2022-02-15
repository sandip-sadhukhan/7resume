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

const MainArea = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")

  return (
    <Center
      w="100%"
      minH="100vh"
      as="main"
      overflowY="auto"
      px={[3, 5, 10]}
      id="main-page-full-image"
    >
      <Flex flexDir="column" w="full" align="center">
        <Heading color="white" as="h3" fontWeight={200} size="lg">
          Hello I&apos;m Sandip Sadhukhan
        </Heading>
        <Flex>
          <Heading as="h2" color="white" fontWeight={300} size="xl">
            I&apos;m working as
          </Heading>
          <Heading ml={3} as="h2" color="white" fontWeight={600} size="xl">
            <Typed
              strings={["Programmer", "Developer", "Engineer"]}
              typeSpeed={70}
              loop
            />
          </Heading>
        </Flex>
        <HStack spacing={8} mt={10}>
          <Button variant="solid" bgColor={secondaryColor}>
            <AiFillContacts fontSize={20} />
            <Text ml={2}>Contact Me</Text>
          </Button>
          <Button variant="solid" bgColor={secondaryColor}>
            <RiSuitcaseLine fontSize={20} />
            <Text ml={2}>Hire Me</Text>
          </Button>
        </HStack>
      </Flex>
    </Center>
  )
}

export default MainArea
