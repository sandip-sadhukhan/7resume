import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react"
import React from "react"

const ContactInformationContent = () => {
  return (
    <>
      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Address
        </Text>
        <Textarea
          size="sm"
          placeholder="Address"
          flex={[1, 1, 8, 8, 10]}
        ></Textarea>
      </HStack>

      <Divider />

      <HStack
        w="full"
        ps={[0, 0, 3, 3, 3]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
        align="start"
        spacing={0}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={[0, 0, 2, 2, 2]}
          pe={[0, 0, 3, 3, 3]}
        >
          Location
        </Text>
        <Flex w="full" flex={[1, 1, 4, 4, 5]}>
          <Input size="sm" placeholder="Longitude" />
        </Flex>
        <Flex w="full" flex={[1, 1, 4, 4, 5]}>
          <Input size="sm" placeholder="Latitude" />
        </Flex>
      </HStack>

      <Divider />

      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Phone
        </Text>
        <Textarea
          size="sm"
          placeholder="Phone"
          flex={[1, 1, 8, 8, 10]}
        ></Textarea>
      </HStack>

      <Divider />

      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Text
          fontSize={13}
          flex={[1, 1, 1, 2, 2]}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
        >
          Email
        </Text>
        <Textarea
          size="sm"
          placeholder="Email"
          flex={[1, 1, 8, 8, 10]}
        ></Textarea>
      </HStack>

      <Divider />
      <HStack
        ps={["full", "full", 110, 150, 175]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button size="sm" rounded={0} colorScheme="green">
          Save
        </Button>
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </>
  )
}

export default ContactInformationContent
