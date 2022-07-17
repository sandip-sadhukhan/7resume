import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import EducationSection from "../../../components/dashboard/sections/education"

const Education: NextPage = () => {
  return (
    <Layout currentMenu="Education">
      <EducationSection />
    </Layout>
  )
}

export default Education
