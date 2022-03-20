import { NextPage } from "next"
import React from "react"
import Layout from "../../../../../components/dashboard/layout"
import EditCategorySection from "../../../../../components/dashboard/sections/project/category/edit-category"

const NewCategory: NextPage = () => {
  return (
    <Layout currentMenu="Edit Category">
      <EditCategorySection />
    </Layout>
  )
}

export default NewCategory
