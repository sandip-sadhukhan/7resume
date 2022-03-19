import { Button, Divider, Flex, HStack, Input, Text } from "@chakra-ui/react"
import React from "react"

const SocialLinksContent = () => {
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
            Facebook
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="facebook profile url" />
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
            Twitter
          </Text>
        </Flex>
        <Flex flex={[1, 1, 8, 8, 10]} w="full">
          <Input w="full" size="sm" placeholder="twitter profile url" />
        </Flex>
      </HStack>
      <Divider />

      <Text>Similarly add others through loop</Text>

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

export default SocialLinksContent
