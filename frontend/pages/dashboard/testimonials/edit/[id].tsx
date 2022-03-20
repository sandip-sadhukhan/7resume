import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditTestimonialSection from "../../../../components/dashboard/sections/testimonials/edit-testimonial"

const EditTestimonial: NextPage = () => {
  return (
    <Layout currentMenu="Edit Project">
      <EditTestimonialSection />
    </Layout>
  )
}

export default EditTestimonial
