import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import React from "react"
import { ServiceType } from "../../../../types/profile"
import ServiceBox from "./ServiceBox"

interface Props {
  grayBackground: string
  services: ServiceType[]
}

const Service = (props: Props) => {
  return (
    <Flex w="full" pt={10} pb={5}>
      <Box
        bgColor={props.grayBackground}
        p={[3, 3, 5, 10, 10]}
        w="full"
        borderRadius={5}
        shadow="md"
      >
        <VStack align="start">
          <Heading as="h4" fontSize={[20, 20, 20, 30, 30]}>
            My Services
          </Heading>
          <SimpleGrid
            columns={[1, 1, 1, 2, 2]}
            pt={8}
            alignContent="center"
            spacing={12}
          >
            {props.services?.map((service) => (
              <ServiceBox
                key={service.id}
                title={service.title}
                description={service.description}
                imageURL={service.image}
              />
            ))}
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Service
