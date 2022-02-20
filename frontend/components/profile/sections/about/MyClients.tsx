import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

interface Props {
  grayBackground: string
}

const MyClients = (props: Props) => {
  return (
    <Flex pb={16} flexDir="column" w="full">
      <VStack
        pt={10}
        px={[4, 5, 6, 8, 10]}
        align="start"
        bgColor={props.grayBackground}
        w="full"
      >
        <Heading as="h3" mb={5} fontSize={[20, 20, 20, 30, 30]}>
          My Clients
        </Heading>
        <SimpleGrid pb={5} columns={[2, 2, 4, 6, 6]} w="full" gap={10}>
          <Image width={100} height={70} src="/clients/1.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/2.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/3.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/4.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/5.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/6.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/7.png" alt="Disney" />
          <Image width={100} height={70} src="/clients/8.png" alt="Disney" />
        </SimpleGrid>
      </VStack>
    </Flex>
  )
}

export default MyClients
