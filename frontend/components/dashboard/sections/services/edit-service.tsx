import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import Image from "../../../image"

const EditService = () => {
  const bgColor = useColorModeValue("white", "gray.700")

  return (
    <VStack
      bgColor={bgColor}
      w="full"
      align="start"
      py={5}
      px={8}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Edit Service | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Edit Service
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" align="start" spacing={4}>
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
              Title
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <Input w="full" size="sm" placeholder="Title" />
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
              Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <Textarea placeholder="Description" size="sm" />
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
              Image
            </Text>
          </Flex>
          <Flex flex={[1, 1, 5, 6, 8]} w="full">
            <Input w="full" type="file" size="sm" placeholder="Title" />
          </Flex>
          <Flex flex={[1, 1, 1, 2, 2]} w="full">
            <Image width={40} height={40} src="/avatar-1.jpg" alt="service" />
          </Flex>
        </HStack>
        <Divider />
        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <Button size="sm" rounded={0} colorScheme="green">
            Save
          </Button>
          <Link href="/dashboard/services">
            <a>
              <Button size="sm" rounded={0} colorScheme="red">
                Cancel
              </Button>
            </a>
          </Link>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default EditService