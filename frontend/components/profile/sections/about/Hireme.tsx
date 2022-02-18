import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { BsFillPlayFill } from "react-icons/bs"

const Hireme = () => {
  const hireMeGradient = useColorModeValue(
    "linear(to-l, rgba(230,173,125, 1), rgba(248,143,56, 1))",
    "linear(to-r, #0072ff, #00c6ff)"
  )

  return (
    <Flex pb={10} w="full">
      <Box bgGradient={hireMeGradient} w="full" px={14} py={20}>
        <Flex flexDir={["column", "column", "column", "row", "row"]}>
          <VStack
            align="start"
            flex={3}
            display={["none", "none", "flex", "flex", "flex"]}
          >
            <Heading
              as="h3"
              size="lg"
              fontWeight={500}
              textTransform="uppercase"
              color="white"
            >
              Why you hire me?
            </Heading>
            <Heading color="white">
              I&apos;M THE BEST FRONT END EXPERT IN THE MARKETPLACE
            </Heading>
          </VStack>
          <Center flex={2}>
            <Button
              rounded="full"
              w="100px"
              h="100px"
              shadow="2xl"
              as="a"
              href="https://www.youtube.com/watch?v=NtfbWkxJTHw"
              target="_blank"
            >
              <BsFillPlayFill fontSize={50} />
            </Button>
          </Center>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Hireme
