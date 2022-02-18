import {
  Heading,
  HStack,
  SimpleGrid,
  Text,
  VStack,
  Image,
} from "@chakra-ui/react"
import React from "react"
import { BiCoffeeTogo, BiMap } from "react-icons/bi"
import { FaBriefcase } from "react-icons/fa"
import { ImStack } from "react-icons/im"
import IconBox from "./IconBox"

interface Props {
  headingColor: string
  secondaryColor: string
}

const Hero = (props: Props) => {
  return (
    <SimpleGrid pt={[1, 1, 5, 10, 10]} columns={[1, 1, 1, 2, 2]} w="full">
      <VStack
        align={["center", "center", "center", "start", "start"]}
        pt={[5, 5, 5, 10, 10]}
        w="full"
      >
        <Heading size="md">Sandip Sadhukhan</Heading>
        <HStack>
          <BiMap />
          <Text colorScheme="blackAlpha">West Bengal, India</Text>
        </HStack>

        <Text pt={5} textAlign="justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo in, modi
          vero nulla odit maxime, fuga sequi, ex praesentium expedita esse
          voluptates. Non cumque, quasi amet suscipit iure fuga deserunt error
          obcaecati harum perferendis assumenda consequuntur aperiam cum vero
          pariatur earum! Sint, ea quos ab facilis suscipit beatae amet
          consequatur, ipsam
        </Text>
        <Text textAlign="justify">
          velit odio a eos expedita non quae, qui esse ipsum assumenda nihil
          facere cum sequi optio harum dolor reiciendis? Soluta tenetur quas ea
          optio ab? Ratione rerum odit explicabo magni amet provident hi.
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
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            primaryText="5+ Years Job"
            secondaryText="Experience"
            icon={FaBriefcase}
          />
          <IconBox
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            primaryText="300+ Projects"
            secondaryText="Completed"
            icon={ImStack}
          />
          <IconBox
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            primaryText="120+ Meetings"
            secondaryText="Successful"
            icon={BiCoffeeTogo}
          />
        </HStack>
      </VStack>
      <VStack w="100%" h="100%">
        <Image src="/about-bg.png" alt="pc" />
      </VStack>
    </SimpleGrid>
  )
}

export default Hero
