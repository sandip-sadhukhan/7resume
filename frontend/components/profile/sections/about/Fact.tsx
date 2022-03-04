import { Flex, Heading, HStack } from "@chakra-ui/react"
import React from "react"
import { BiBulb, BiTrophy } from "react-icons/bi"
import { BsEmojiSmile } from "react-icons/bs"
import { FiCoffee } from "react-icons/fi"
import FactBox from "./FactBox"

interface Props {
  grayBackground: string
  secondaryColor: string
  happy_clients: number
  experience: number
  awards_won: number
  meetings: number
}

const Fact = (props: Props) => {
  return (
    <Flex pt={5} pb={10} flexDir="column" w="full">
      <Heading as="h3" fontSize={[20, 20, 20, 30, 30]}>
        Facts
      </Heading>
      <HStack
        pt={8}
        w="full"
        spacing={[0, 0, 0, 4, 6]}
        flexDir={["column", "column", "column", "row", "row"]}
        gap={4}
      >
        <FactBox
          grayBackground={props.grayBackground}
          secondaryColor={props.secondaryColor}
          primaryText="Happy Clients"
          secondaryText={props.happy_clients}
          icon={BsEmojiSmile}
        />
        <FactBox
          grayBackground={props.grayBackground}
          secondaryColor={props.secondaryColor}
          primaryText="Experience Years"
          secondaryText={props.experience}
          icon={BiBulb}
        />
        <FactBox
          grayBackground={props.grayBackground}
          secondaryColor={props.secondaryColor}
          primaryText="Awards Won"
          secondaryText={props.awards_won}
          icon={BiTrophy}
        />
        <FactBox
          grayBackground={props.grayBackground}
          secondaryColor={props.secondaryColor}
          primaryText="Meetings"
          secondaryText={props.meetings}
          icon={FiCoffee}
        />
      </HStack>
    </Flex>
  )
}

export default Fact
