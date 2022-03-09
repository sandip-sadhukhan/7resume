import { Heading, HStack, Text } from "@chakra-ui/react"
import React from "react"
import { FaCheck } from "react-icons/fa"

interface Props {
  secondaryColor: string
  day: string
  startTime: string | null
  endTime: string | null
}

const AvailableAppointment = (props: Props) => {
  const convertTimeFrom24To12Format = (time: string | null): string => {
    // if time is null then return empty string
    if (time === null) return ""

    // otherwise calculate the time in 12 hour format
    const hour: number = parseInt(time.slice(0, 2))
    let newHour: number = hour
    let amPm = "AM"

    if (hour > 12) {
      amPm = "PM"
      newHour = hour % 12
    }
    return `${newHour}:${time.slice(3, 5)} ${amPm}`
  }

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
      <Text>
        {convertTimeFrom24To12Format(props.startTime)} -{" "}
        {convertTimeFrom24To12Format(props.endTime)}
      </Text>
    </HStack>
  )
}

export default AvailableAppointment
