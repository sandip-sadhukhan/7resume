import { Button, Center, Heading, Text, VStack } from "@chakra-ui/react"
import Head from "next/head"
import Link from "next/link"
import React from "react"
import { BiArrowBack } from "react-icons/bi"
import { IErrorProps } from "../types/pages"

const Error: React.FC<IErrorProps> = (props: IErrorProps) => {
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
      <VStack mt={3}>
        <Link href="/" passHref>
          <Button variant="outline" rounded={0} colorScheme="green" size="sm">
            <BiArrowBack />
            <Text ms={1}>Back to Home</Text>
          </Button>
        </Link>
      </VStack>
    </Center>
  )
}

export default Error
