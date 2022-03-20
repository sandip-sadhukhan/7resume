import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewExperienceSection from "../../../components/dashboard/sections/experiences/new-experience"

const NewExperience: NextPage = () => {
  return (
    <Layout currentMenu="New Experience">
      <NewExperienceSection />
    </Layout>
  )
}

export default NewExperience
