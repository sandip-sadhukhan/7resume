import { Flex, Heading, HStack } from "@chakra-ui/react"
import React from "react"
import PricingBox from "./PricingBox"

interface Props {
  headingColor: string
  secondaryColor: string
}

const Pricing = (props: Props) => {
  return (
    <Flex pt={5} pb={16} flexDir="column" w="full">
      <Heading as="h3" fontSize={[20, 20, 20, 30, 30]}>
        Pricing Plans
      </Heading>
      <HStack
        alignItems="end"
        w="full"
        pt={10}
        spacing={[0, 0, 0, 6, 8]}
        gap={4}
        flexDir={["column", "column", "column", "row", "row"]}
      >
        <PricingBox
          title="Basic Plan"
          headingColor={props.headingColor}
          imageURL="/basic-plan.png"
          features={[
            "Feature1",
            "Feature2",
            "Feature3",
            "Feature4",
            "Feature5",
          ]}
          secondaryColor={props.secondaryColor}
        />
        <PricingBox
          title="Pro Plan"
          headingColor={props.headingColor}
          imageURL="/pro-plan.png"
          features={[
            "Feature1",
            "Feature2",
            "Feature3",
            "Feature4",
            "Feature5",
          ]}
          secondaryColor={props.secondaryColor}
          specialPrice="SAVE 50%"
        />
        <PricingBox
          title="Plus Plan"
          headingColor={props.headingColor}
          imageURL="/plus-plan.png"
          features={[
            "Feature1",
            "Feature2",
            "Feature3",
            "Feature4",
            "Feature5",
          ]}
          secondaryColor={props.secondaryColor}
        />
      </HStack>
    </Flex>
  )
}

export default Pricing
