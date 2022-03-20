import {
  Button,
  Checkbox,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

const NewExperienceSection = () => {
  const router = useRouter()

  return (
    <VStack
      bgColor="white"
      w="full"
      align="start"
      py={5}
      px={8}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>New Experience | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Experience
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack w="full" align="start" spacing={4} pt={2} alignItems="baseline">
        <HStack
          align="start"
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDir={["column", "column", "row", "row", "row"]}
          gap={4}
        >
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Company
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input size="sm" placeholder="School" />
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center" gap={1}>
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Image
            </Text>
            <Text color="red">*</Text>
          </Flex>
          <Flex ps={4} flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input type="file" size="sm" />
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Position
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input size="sm" placeholder="Field" />
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Description
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Textarea size="sm" placeholder="Description" />
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
          <Flex flex={[1, 1, 1, 2, 2]} w="full" alignItems="center">
            <Text
              w="full"
              fontSize={14}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Date From
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems={["start", "start", "end", "end", "end"]}
            gap={[4, 4, 8, 8, 8]}
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex flex={2}>
              <Input type="date" size="sm" placeholder="School" />
            </Flex>
            <Flex flex={3} gap={3} alignItems="center">
              <Text fontSize={14} minW={50}>
                Date To
              </Text>
              <Input type="date" size="sm" placeholder="School" />
            </Flex>
          </Flex>
        </HStack>
        <HStack
          w="full"
          justifyContent={["start", "start", "end", "end", "end"]}
          pe={[0, 0, "30%", "30%", "30%"]}
        >
          <Checkbox p={0} size="sm">
            I currently work
          </Checkbox>
        </HStack>
        <Divider />

        <HStack
          w={["full", "full", 260, 320, 330]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <Button size="sm" rounded={0} colorScheme="green">
            Save
          </Button>
          <Button
            onClick={() => router.back()}
            size="sm"
            rounded={0}
            colorScheme="red"
          >
            Cancel
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default NewExperienceSection
