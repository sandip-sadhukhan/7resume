import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditProjectSection from "../../../../components/dashboard/sections/project/edit-project"

const EditProject: NextPage = () => {
  return (
    <Layout currentMenu="Edit Project">
      <EditProjectSection />
    </Layout>
  )
}

export default EditProject
