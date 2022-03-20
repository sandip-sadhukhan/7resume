import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewPricingPlanSection from "../../../components/dashboard/sections/pricing-plans/new-pricing-plans"

const NewPricingPlan: NextPage = () => {
  return (
    <Layout currentMenu="New Pricing Plans">
      <NewPricingPlanSection />
    </Layout>
  )
}

export default NewPricingPlan
