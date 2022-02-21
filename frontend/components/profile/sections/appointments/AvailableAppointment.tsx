import { Heading, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { FaCheck } from "react-icons/fa"

interface Props {
  secondaryColor: string
  day: string
  timeSlot: string
}

const AvailableAppointment = (props: Props) => {
  return (
    <HStack>
      <HStack
        justifyContent="center"
        w={8}
        h={8}
        bgColor={props.secondaryColor}
        rounded="full"
        color="white"
      >
        <FaCheck />
      </HStack>
      <Heading size="sm">{props.day}:</Heading>
      <Text>{props.timeSlot}</Text>
    </HStack>
  )
}

export default AvailableAppointment
