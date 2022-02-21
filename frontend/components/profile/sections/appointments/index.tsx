import React from "react"
import { useColorModeValue, VStack, HStack } from "@chakra-ui/react"
import SectionHeading from "../../SectionHeading"
import MyAppointments from "./MyAppointments"
import AppointmentForm from "./AppointmentForm"

const AppointmentSection = () => {
  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const headingColor = useColorModeValue("gray.800", "gray.50")

  return (
    <VStack
      align="start"
      justifyContent="center"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w={["95%", "95%", "95%", "full", "full"]}
    >
      {/* Heading */}
      <SectionHeading
        secondaryColor={secondaryColor}
        headingColor={headingColor}
        title="Appointments"
      />

      <HStack align="start" w="full" pt={10} spacing={16}>
        {/* My Appointments */}
        <MyAppointments secondaryColor={secondaryColor} />

        {/* Appointment Form */}
        <AppointmentForm secondaryColor={secondaryColor} />
      </HStack>
    </VStack>
  )
}

export default AppointmentSection
