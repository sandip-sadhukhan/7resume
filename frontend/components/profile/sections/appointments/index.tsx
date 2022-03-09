import React from "react"
import { useColorModeValue, VStack, HStack } from "@chakra-ui/react"
import SectionHeading from "../../SectionHeading"
import MyAppointments from "./MyAppointments"
import AppointmentForm from "./AppointmentForm"
import { AppointmentSectionProps } from "../../../../types/profile"

const AppointmentSection: React.FC<AppointmentSectionProps> = (
  props: AppointmentSectionProps
) => {
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

      <HStack
        align="start"
        w="full"
        pt={10}
        spacing={[0, 0, 0, 8, 16]}
        flexDir={["column", "column", "column", "row", "row"]}
      >
        {/* My Appointments */}
        <MyAppointments
          secondaryColor={secondaryColor}
          appointments={props.appointment}
        />

        {/* Appointment Form */}
        <AppointmentForm secondaryColor={secondaryColor} />
      </HStack>
    </VStack>
  )
}

export default AppointmentSection
