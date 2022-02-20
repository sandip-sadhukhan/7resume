import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import React from "react"
import ServiceBox from "./ServiceBox"

interface Props {
  grayBackground: string
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
          {/* <Heading as="h4" fontWeight={200} fontSize={[20, 20, 20, 30, 30]}>
              What Actually I Do
            </Heading> */}
          <Heading as="h4" fontSize={[20, 20, 20, 30, 30]}>
            My Services
          </Heading>
          <SimpleGrid
            columns={[1, 1, 1, 2, 2]}
            pt={8}
            alignContent="center"
            spacing={12}
          >
            <ServiceBox
              title="Web Development"
              description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
              imageURL="/1.png"
            />
            <ServiceBox
              title="Embeded System"
              description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
              imageURL="/2.png"
            />
            <ServiceBox
              title="Graphic Design"
              description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
              imageURL="/3.png"
            />
            <ServiceBox
              title="SEO Specialist"
              description="Pellentesque pellentesque, ipsum sit amet auctor accumsan, odio tortor bibendum massa, sit amet ultricies ex lectus scelerisque nibh. Ut non sodales odio."
              imageURL="/4.png"
            />
          </SimpleGrid>
        </VStack>
      </Box>
    </Flex>
  )
}

export default Service
