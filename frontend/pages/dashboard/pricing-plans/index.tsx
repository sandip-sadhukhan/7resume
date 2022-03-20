import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import PricingPlanSection from "../../../components/dashboard/sections/pricing-plans"

const PricingPlan: NextPage = () => {
  return (
    <Layout currentMenu="Pricing Plan">
      <PricingPlanSection />
    </Layout>
  )
}

export default PricingPlan
