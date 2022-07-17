import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewEducationSection from "../../../components/dashboard/sections/education/new-education"

const NewEducation: NextPage = () => {
  return (
    <Layout currentMenu="New Education">
      <NewEducationSection />
    </Layout>
  )
}

export default NewEducation
