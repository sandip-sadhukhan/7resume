import { Heading, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { AppointmentType } from "../../../../types/profile"
import AvailableAppointment from "./AvailableAppointment"

interface Props {
  secondaryColor: string
  appointments: AppointmentType
}

const MyAppointments = (props: Props) => {
  const { secondaryColor, appointments } = props

  return (
    <VStack align="start" w="full">
      <Heading size="sm">My Appointments</Heading>
      <Text>Before booking an appointment please check my availability</Text>
      <VStack pt={6} gap={4} align="start">
        {appointments.sunday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Sunday"
            startTime={appointments.sunday_start_time}
            endTime={appointments.sunday_end_time}
          />
        ) : null}
        {appointments.monday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Monday"
            startTime={appointments.monday_start_time}
            endTime={appointments.monday_end_time}
          />
        ) : null}
        {appointments.tuesday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Tuesday"
            startTime={appointments.tuesday_start_time}
            endTime={appointments.tuesday_end_time}
          />
        ) : null}
        {appointments.wednesday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Wednesday"
            startTime={appointments.wednesday_start_time}
            endTime={appointments.wednesday_end_time}
          />
        ) : null}
        {appointments.thursday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Thursday"
            startTime={appointments.thursday_start_time}
            endTime={appointments.thursday_end_time}
          />
        ) : null}
        {appointments.friday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Friday"
            startTime={appointments.friday_start_time}
            endTime={appointments.friday_end_time}
          />
        ) : null}
        {appointments.saturday ? (
          <AvailableAppointment
            secondaryColor={secondaryColor}
            day="Saturday"
            startTime={appointments.saturday_start_time}
            endTime={appointments.saturday_end_time}
          />
        ) : null}
      </VStack>
    </VStack>
  )
}

export default MyAppointments
