import { Flex, Heading, SimpleGrid } from "@chakra-ui/react"
import React from "react"
import { PricingPlanType } from "../../../../types/profile"
import PricingBox from "./PricingBox"

interface Props {
  headingColor: string
  secondaryColor: string
  pricing_plans: PricingPlanType[]
}

const Pricing = (props: Props) => {
  return (
    <Flex pt={5} pb={16} flexDir="column" w="full">
      <Heading as="h3" fontSize={[20, 20, 20, 30, 30]}>
        Pricing Plans
      </Heading>
      <SimpleGrid
        w="full"
        pt={10}
        spacing={[0, 0, 0, 6, 8]}
        gap={4}
        columns={[1, 1, 2, 2, 3]}
        alignItems="end"
        textAlign="center"
      >
        {props.pricing_plans.map((pricing_plan) => (
          <PricingBox
            key={pricing_plan.id}
            id={pricing_plan.id}
            headingColor={props.headingColor}
            secondaryColor={props.secondaryColor}
            plan_name={pricing_plan.plan_name}
            plan_price={pricing_plan.plan_price}
            price_duration={pricing_plan.price_duration}
            plan_currency={pricing_plan.plan_currency}
            is_featured={pricing_plan.is_featured}
            feature_comment={pricing_plan.feature_comment}
            features={pricing_plan.features}
            plan_icon_path={pricing_plan.plan_icon_path}
          />
        ))}
      </SimpleGrid>
    </Flex>
  )
}

export default Pricing
