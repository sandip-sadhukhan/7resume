import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Switch,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"

const NewPricingPlanSection = () => {
  const bgColor = useColorModeValue("white", "gray.700")
  const router = useRouter()

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
        <title>New Pricing Plan | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        New Pricing Plan
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
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Display Plan
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} pt={3} w="full" alignItems="end">
            <Switch />
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
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Plan Name
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full" alignItems="end">
            <Input w="full" size="sm" placeholder="Plan Name" />
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
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Plan Price
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems="end"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex flex={1}>
              <Input w="full" size="sm" placeholder="Plan Price" />
            </Flex>
            <Flex flex={[1, 1, 2, 2, 2]}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Price Duration
              </Text>
              <Text color="red" ps={1} pe={3}>
                *
              </Text>
              <Input w="full" size="sm" placeholder="Plan Duration" />
            </Flex>
            <Flex flex={[1, 1, 2, 2, 2]}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Plan Currency
              </Text>
              <Text color="red" ps={1} pe={3}>
                *
              </Text>
              <Input w="full" size="sm" placeholder="Plan Currency" />
            </Flex>
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
          <Flex
            flex={[1, 1, 1, 2, 2]}
            w="full"
            alignItems="center"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Text
              w="full"
              fontSize={13}
              textAlign={["start", "start", "end", "end", "end"]}
              pt={2}
            >
              Featured Item
            </Text>
            <Text color="red" ps={1}>
              *
            </Text>
          </Flex>
          <Flex
            flex={[1, 1, 8, 8, 10]}
            w="full"
            alignItems="end"
            flexDir={["column", "column", "row", "row", "row"]}
          >
            <Flex gap={3}>
              <Switch />
              <Text fontSize={13} color="gray">
                Is Featured
              </Text>
            </Flex>
            <Flex flex={1} gap={3}>
              <Text
                w="full"
                fontSize={13}
                textAlign={["start", "start", "end", "end", "end"]}
                pt={2}
              >
                Featured Comment
              </Text>
              <Input w="full" size="sm" placeholder="Featured Comment" />
            </Flex>
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
              Features
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <Textarea placeholder="Features" size="sm" />
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
              Plan Icon
            </Text>
          </Flex>
          <Flex flex={[1, 1, 8, 8, 10]} w="full">
            <Input w="full" type="file" size="sm" placeholder="Title" />
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

export default NewPricingPlanSection
