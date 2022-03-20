import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import ExperienceSection from "../../../components/dashboard/sections/experiences"

const Education: NextPage = () => {
  return (
    <Layout currentMenu="Experience">
      <ExperienceSection />
    </Layout>
  )
}

export default Education
