import React from "react"
import {
  HStack,
  Text,
  Divider,
  Flex,
  Input,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react"
import Image from "../../../image"
import { FaDownload } from "react-icons/fa"

const AboutMeContent = () => {
  return (
    <VStack w="full" spacing={4} align="start">
      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Name
        </Text>
        <Input size="sm" w="full" type="text" placeholder="Name" />
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Profile Picture
        </Text>
        <Input size="sm" w="85%" type="file" placeholder="Name" />
        <Flex px={[0, 0, 4, 4, 4]}>
          <Image
            width={40}
            height={40}
            src="/avatar-1.jpg"
            alt="uploaded image"
          />
        </Flex>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Nationality
        </Text>
        <Input size="sm" w="full" type="text" placeholder="Nationality" />
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          pt={2}
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          About Me
        </Text>
        <Textarea size="sm" w="full" placeholder="About me"></Textarea>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          pt={2}
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          My Positions
        </Text>
        <Textarea size="sm" w="full" placeholder="Positions"></Textarea>
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Video Description
        </Text>
        <Input size="sm" w="full" type="text" placeholder="Video description" />
      </HStack>
      <Divider />

      <HStack
        w="full"
        spacing={[0, 0, 5, 5, 5]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
      >
        <Text
          w={["full", "full", 50, 50, 200]}
          textAlign={["start", "start", "end", "end", "end"]}
          fontSize={13}
        >
          Upload Resume
        </Text>
        <Input size="sm" w="73%" type="file" />
        <HStack as="a" href="#" target="_blank" px={[0, 0, 5, 5, 5]} minW={200}>
          <FaDownload fontSize={14} />
          <Text fontSize={13}>Download Resume</Text>
        </HStack>
      </HStack>
      <Divider />

      <HStack
        w={["full", "full", 245, 245, 245]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button size="sm" rounded={0} colorScheme="green">
          Save
        </Button>
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default AboutMeContent
