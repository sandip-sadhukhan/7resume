import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditExperienceSection from "../../../../components/dashboard/sections/experiences/edit-experience"

const EditExperience: NextPage = () => {
  return (
    <Layout currentMenu="Edit Experience">
      <EditExperienceSection />
    </Layout>
  )
}

export default EditExperience
