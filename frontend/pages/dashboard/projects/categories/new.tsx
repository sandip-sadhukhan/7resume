import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import NewCategorySection from "../../../../components/dashboard/sections/project/category/new-category"

const NewCategory: NextPage = () => {
  return (
    <Layout currentMenu="New Category">
      <NewCategorySection />
    </Layout>
  )
}

export default NewCategory
