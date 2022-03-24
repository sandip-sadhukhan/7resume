import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import React, { ChangeEvent, FormEvent, useState } from "react"

const EditProfileSection: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.700")

  interface IFormData {
    name: string
    username: string
    email: string
    password: string
  }

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
  })

  const { name, username, email, password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    // submit
  }

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
        <title>Administrator Profile | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Administrator Profile
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <VStack
        as="form"
        onSubmit={onSubmit}
        w="full"
        align="start"
        py={4}
        spacing={4}
      >
        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Name
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex w="full" flex={1}>
            <Input
              size="sm"
              w="full"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
              required
              minLength={3}
            />
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Username
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <Input
              size="sm"
              w="full"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
              minLength={3}
            />
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Email
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <Input
              size="sm"
              w="full"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
              minLength={3}
            />
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w="full"
          spacing={[0, 0, 5, 5, 5]}
          flexDirection={["column", "column", "row", "row", "row"]}
          gap={2}
          align="start"
        >
          <HStack
            spacing={1}
            w={["full", "full", 70, 100, 180]}
            justifyContent={["start", "start", "end", "end", "end"]}
          >
            <Text fontSize={14} color="gray">
              Password
            </Text>
            <Text color="red">*</Text>
          </HStack>
          <Flex flex={1} w="full">
            <Input
              size="sm"
              w="full"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength={6}
            />
          </Flex>
        </HStack>

        <Divider />

        <HStack
          w={["full", "full", 152, 182, 262]}
          justifyContent={["start", "start", "end", "end", "end"]}
        >
          <Button type="submit" colorScheme="green" rounded={0} size="sm">
            Save
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default EditProfileSection
