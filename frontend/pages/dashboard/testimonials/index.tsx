import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import TestimonialSection from "../../../components/dashboard/sections/testimonials"

const Testimonials: NextPage = () => {
  return (
    <Layout currentMenu="Testimonials">
      <TestimonialSection />
    </Layout>
  )
}

export default Testimonials
