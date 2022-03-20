import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import NewProjectCategorySection from "../../../../components/dashboard/sections/project/category/new-project-category"

const NewProjectCategory: NextPage = () => {
  return (
    <Layout currentMenu="New Project Category">
      <NewProjectCategorySection />
    </Layout>
  )
}

export default NewProjectCategory
