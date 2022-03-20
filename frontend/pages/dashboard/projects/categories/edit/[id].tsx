import { NextPage } from "next"
import React from "react"
import Layout from "../../../../../components/dashboard/layout"
import EditProjectCategorySection from "../../../../../components/dashboard/sections/project/category/edit-project-category"

const NewProjectCategory: NextPage = () => {
  return (
    <Layout currentMenu="Edit Project Category">
      <EditProjectCategorySection />
    </Layout>
  )
}

export default NewProjectCategory
