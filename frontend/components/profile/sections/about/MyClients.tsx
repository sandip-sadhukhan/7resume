import { Flex, Heading, SimpleGrid, Tooltip, VStack } from "@chakra-ui/react"
import Image from "next/image"
import React from "react"
import { ClientType } from "../../../../types/profile"

interface Props {
  grayBackground: string
  clients: ClientType[]
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
          {props.clients.map((client) => (
            <Tooltip label={client.name} key={client.id}>
              <Image
                width={100}
                height={70}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${client.image_path}`}
                alt={client.name}
              />
            </Tooltip>
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  )
}

export default MyClients
