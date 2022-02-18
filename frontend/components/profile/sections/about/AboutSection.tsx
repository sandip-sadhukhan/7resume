import React from "react"
import {
  Divider,
  Flex,
  Heading,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"

import Hero from "./Hero"
import Service from "./Service"
import Hireme from "./Hireme"
import Fact from "./Fact"
import Pricing from "./Pricing"

const AboutSection = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")

  const grayBackground = useColorModeValue("blue.50", "gray.700")
  // const whiteBackground = useColorModeValue("white", "gray.600")

  return (
    <VStack
      align="start"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w="full"
    >
      {/* Heading */}
      <VStack align="center" w="full">
        <Heading mb={1} color={headingColor} fontWeight={600}>
          ABOUT ME
        </Heading>
        <Divider pt={1} w={40} bgColor={secondaryColor} />
      </VStack>

      {/* Name Description & Image */}
      <Hero secondaryColor={secondaryColor} headingColor={headingColor} />

      {/* Services */}
      <Service grayBackground={grayBackground} />

      {/* Why Hire me */}
      <Hireme />

      {/* Facts */}
      <Fact grayBackground={grayBackground} secondaryColor={secondaryColor} />

      {/* Pricing Plans */}
      <Pricing headingColor={headingColor} secondaryColor={secondaryColor} />

      {/* Client Say */}
      <Flex pt={5} pb={20} flexDir="column" w="full">
        <VStack
          pt={10}
          px={[4, 5, 6, 8, 10]}
          align="start"
          bgColor={grayBackground}
          w="full"
        >
          <Heading as="h3" mb={10} fontSize={[20, 20, 20, 30, 30]}>
            Client Say
          </Heading>
        </VStack>
      </Flex>
    </VStack>
  )
}

export default AboutSection
