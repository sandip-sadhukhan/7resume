import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { AiOutlineUser } from "react-icons/ai"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Resume Bus</title>
        <meta name="description" content="Best Resume maker application" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Flex
        w="full"
        h="100vh"
        overflow="hidden"
        bgGradient="linear(to-r, #24c6dc, #514a9d)"
        color="white"
        justifyContent="center"
        alignItems="center"
      >
        <VStack
          bgColor="blackAlpha.300"
          py={16}
          px={10}
          rounded="sm"
          shadow="sm"
          w={["full", "full", "full", "50%", "50%"]}
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          <Heading as="h1" size="2xl">
            Welcome to Resume Bus
          </Heading>
          <Heading as="h2" size="lg" color="red.300">
            Best Resume CMS on the Market
          </Heading>
          <Text textAlign="center" as="p" pt={5}>
            Start making your resume website, quick & efficiently.
          </Text>
          <Text as="p" pb={5} textAlign="center">
            Sign Up and get your dashboard, start building your website.
          </Text>
          <Button colorScheme="blackAlpha" size="lg">
            <Link href="/sandip">
              <a>
                <Flex align="center" gap={1}>
                  <Text>Start Making Your Profile</Text>
                  <AiOutlineUser />
                </Flex>
              </a>
            </Link>
          </Button>
        </VStack>
      </Flex>
    </>
  )
}

export default Home
