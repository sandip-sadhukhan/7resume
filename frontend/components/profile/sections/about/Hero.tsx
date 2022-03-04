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
  name: string
  nationality: string
  about_me: string
  experience: number
  projects: number
  meetings: number
  about_me_image: string
}

const Hero = (props: Props) => {
  return (
    <SimpleGrid pt={[1, 1, 5, 10, 10]} columns={[1, 1, 1, 2, 2]} w="full">
      <VStack
        align={["center", "center", "center", "start", "start"]}
        pt={[5, 5, 5, 10, 10]}
        w="full"
      >
        <Heading size="md">{props.name}</Heading>
        <HStack>
          <BiMap />
          <Text colorScheme="blackAlpha">{props.nationality}</Text>
        </HStack>

        <Text pt={5} textAlign="justify" style={{ whiteSpace: "pre-wrap" }}>
          {props.about_me}
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
            primaryText={`${props.experience}+ Years Job`}
            secondaryText="Experience"
            icon={FaBriefcase}
          />
          <IconBox
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            primaryText={`${props.projects}+ Projects`}
            secondaryText="Completed"
            icon={ImStack}
          />
          <IconBox
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            primaryText={`${props.meetings}+ Meetings`}
            secondaryText="Successful"
            icon={BiCoffeeTogo}
          />
        </HStack>
      </VStack>
      <VStack w="100%" h="100%">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.about_me_image}`}
          alt="pc"
        />
      </VStack>
    </SimpleGrid>
  )
}

export default Hero
