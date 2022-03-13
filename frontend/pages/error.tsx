import { Center, Heading, Text } from "@chakra-ui/react"
import Head from "next/head"
import React from "react"

interface ErrorProps {
  status?: number
  description?: string
}

const Error: React.FC<ErrorProps> = (props: ErrorProps) => {
  const { status = 400, description = "Bad request" } = props

  return (
    <Center h="100vh" flexDir="column">
      <Head>
        <title>
          {status} | {description}
        </title>
      </Head>
      <Heading color="red" size="4xl">
        {status}
      </Heading>
      <Text fontSize={20} py={2}>
        {description}
      </Text>
    </Center>
  )
}

export default Error
