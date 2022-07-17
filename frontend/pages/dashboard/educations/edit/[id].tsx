import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditEducationSection from "../../../../components/dashboard/sections/education/edit-education"

const EducationEdit: NextPage = () => {
  return (
    <Layout currentMenu="Edit Education">
      <EditEducationSection />
    </Layout>
  )
}

export default EducationEdit
