import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditPricingPlanSection from "../../../../components/dashboard/sections/pricing-plans/edit-pricing-plan"

const PricingPlanEdit: NextPage = () => {
  return (
    <Layout currentMenu="Edit Pricing Plan">
      <EditPricingPlanSection />
    </Layout>
  )
}

export default PricingPlanEdit
