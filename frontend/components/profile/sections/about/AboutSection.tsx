import React from "react"
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
  Box,
  Center,
  IconButton,
  Button,
} from "@chakra-ui/react"
import { BiMap, BiCoffeeTogo } from "react-icons/bi"
import { FaBriefcase } from "react-icons/fa"
import { ImStack } from "react-icons/im"

import IconBox from "./IconBox"
import ServiceBox from "./ServiceBox"
import { BsFillPlayFill } from "react-icons/bs"
import Link from "next/link"

const AboutSection = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.700", "gray.200")
  const hireMeGradient = useColorModeValue(
    "linear(to-l, rgba(230,173,125, 1), rgba(248,143,56, 1))",
    "linear(to-r, #0072ff, #00c6ff)"
  )

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
            esse voluptates. Non cumque, quasi amet suscipit iure fuga deserunt
            error obcaecati harum perferendis assumenda consequuntur aperiam cum
            vero pariatur earum! Sint, ea quos ab facilis suscipit beatae amet
            consequatur, ipsam
          </Text>
          <Text textAlign="justify">
            velit odio a eos expedita non quae, qui esse ipsum assumenda nihil
            facere cum sequi optio harum dolor reiciendis? Soluta tenetur quas
            ea optio ab? Ratione rerum odit explicabo magni amet provident hi.
          </Text>

          <HStack
            flexDir={["column", "column", "column", "column", "row"]}
            pt={5}
            justifyContent={[
              "center",
              "center",
              "center",
              "space-between",
              "space-between",
            ]}
            alignItems="center"
            w="full"
            spacing={0}
          >
            <IconBox
              headingColor={headingColor}
              secondaryColor={secondaryColor}
              primaryText="5+ Years Job"
              secondaryText="Experience"
              icon={FaBriefcase}
            />
            <IconBox
              headingColor={headingColor}
              secondaryColor={secondaryColor}
              primaryText="300+ Projects"
              secondaryText="Completed"
              icon={ImStack}
            />
            <IconBox
              headingColor={headingColor}
              secondaryColor={secondaryColor}
              primaryText="120+ Meetings"
              secondaryText="Successful"
              icon={BiCoffeeTogo}
            />
          </HStack>
        </VStack>
        <VStack>
          <Image src="/about-bg.png" alt="pc" />
        </VStack>
      </SimpleGrid>

      {/* Services */}
      <Flex w="full" py={10}>
        <Box
          bgColor={useColorModeValue("gray.100", "gray.700")}
          p={[3, 3, 5, 10, 10]}
          w="full"
          borderRadius={5}
          shadow="md"
        >
          <VStack align="start">
            {/* <Heading as="h4" fontWeight={200} fontSize={[20, 20, 20, 30, 30]}>
              What Actually I Do
            </Heading> */}
            <Heading as="h4" fontSize={[20, 20, 20, 30, 30]}>
              My Services
            </Heading>
            <SimpleGrid
              columns={[1, 1, 1, 2, 2]}
              pt={8}
              alignContent="center"
              spacing={12}
            >
              <ServiceBox
                title="Web Development"
                description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
                imageURL="/1.png"
              />
              <ServiceBox
                title="Embeded System"
                description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
                imageURL="/2.png"
              />
              <ServiceBox
                title="Graphic Design"
                description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
                imageURL="/3.png"
              />
              <ServiceBox
                title="SEO Specialist"
                description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
                imageURL="/4.png"
              />
            </SimpleGrid>
          </VStack>
        </Box>
      </Flex>

      {/* Why Hire me */}
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
                // color="white"
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
    </VStack>
  )
}

export default AboutSection
