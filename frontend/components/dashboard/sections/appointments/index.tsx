import {
  Button,
  Checkbox,
  Divider,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import React from "react"

const AppointmentsSection = () => {
  return (
    <VStack
      bgColor="white"
      w="full"
      align="start"
      py={5}
      px={[2, 2, 4, 8, 8]}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Appointments | Dashboard</title>
      </Head>
      <HStack w="full" justifyContent="space-between">
        <Heading pb={2} as="h3" size="md" fontWeight="normal">
          Appointments
        </Heading>
      </HStack>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        w="full"
        py={5}
        align="start"
        spacing={4}
        overflowX="auto"
        px={[4, 4, 8, 10, 10]}
      >
        {[
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ].map((day, index) => (
          <HStack
            key={index}
            w="full"
            align="start"
            flexDir={["column", "column", "row", "row", "row"]}
            gap={3}
            justifyContent="space-between"
            alignItems={["start", "start", "center", "center", "center"]}
          >
            <Checkbox defaultChecked size="sm" minW={100}>
              {day}
            </Checkbox>
            <HStack>
              <Text fontSize={13} color="gray" minW={70}>
                Start Time
              </Text>
              <Input size="sm" type="time" />
            </HStack>
            <HStack>
              <Text fontSize={13} color="gray" minW={70}>
                End Time
              </Text>
              <Input size="sm" type="time" />
            </HStack>
          </HStack>
        ))}
      </VStack>

      <Divider />

      <VStack w="full" align="end" pt={6}>
        <HStack>
          <Button size="sm" rounded={0} colorScheme="green">
            Save
          </Button>
          <Button size="sm" rounded={0} colorScheme="red">
            Cancel
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default AppointmentsSection
