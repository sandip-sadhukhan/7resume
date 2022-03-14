import { Divider, Heading, VStack } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"

const EditProfileSection = () => {
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
        <title>Home | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Administrator Profile
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />
    </VStack>
  )
}

export default EditProfileSection
