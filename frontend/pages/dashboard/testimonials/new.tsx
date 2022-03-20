import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewTestimonialSection from "../../../components/dashboard/sections/testimonials/new-testimonial"

const NewTestimonial: NextPage = () => {
  return (
    <Layout currentMenu="New Project">
      <NewTestimonialSection />
    </Layout>
  )
}

export default NewTestimonial
