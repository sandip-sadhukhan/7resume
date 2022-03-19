import { Button, Divider, Flex, HStack, Input, Text } from "@chakra-ui/react"
import React from "react"

const StatisticsContent = () => {
  return (
    <>
      <HStack
        align="start"
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={4}
      >
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Projects
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="Ex - 300" />
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
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Meetings
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="Ex - 120" />
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
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Happy Clients
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="Ex - 1200" />
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
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Awards Won
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="Ex - 22" />
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
        <Flex flex={[1, 1, 1, 2, 2]} w="full">
          <Text
            w="full"
            fontSize={13}
            textAlign={["start", "start", "end", "end", "end"]}
            pt={2}
          >
            Experience
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="Ex - 5" />
        </Flex>
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

export default StatisticsContent
