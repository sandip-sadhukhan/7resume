import { Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import React from "react"
import { ClientType } from "../../../../types/profile"
import Image from "../../../image"

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
            <Flex key={client.id} cursor="pointer" title={client.name}>
              <Image
                transition="ease-out"
                transitionProperty="all"
                transitionDuration="normal"
                _groupHover={{
                  transform: "scale(1.1,1.1)",
                }}
                width={70}
                height={70}
                src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${client.image_path}`}
                alt={client.name}
                objectFit="cover"
                quality="100"
              />
            </Flex>
          ))}
        </SimpleGrid>
      </VStack>
    </Flex>
  )
}

export default MyClients
