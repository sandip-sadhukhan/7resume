import { Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"
import AvailableAppointment from "./AvailableAppointment"

interface Props {
  secondaryColor: string
}

const MyAppointments = (props: Props) => {
  return (
    <VStack align="start" w="full">
      <Heading size="sm">My Appointments</Heading>
      <Text>Before booking an appointment please check my availability</Text>
      <VStack pt={6} gap={4} align="start">
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Sunday"
          timeSlot="10:20 PM - 3:15 AM"
        />
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Monday"
          timeSlot="10:20 PM - 3:15 AM"
        />
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Tuesday"
          timeSlot="10:20 PM - 3:15 AM"
        />
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Wednesday"
          timeSlot="10:20 PM - 3:15 AM"
        />
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Thursday"
          timeSlot="10:20 PM - 3:15 AM"
        />
        <AvailableAppointment
          secondaryColor={props.secondaryColor}
          day="Friday"
          timeSlot="10:20 PM - 3:15 AM"
        />
      </VStack>
    </VStack>
  )
}

export default MyAppointments
