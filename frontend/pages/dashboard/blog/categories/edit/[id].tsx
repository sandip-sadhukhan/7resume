import { NextPage } from "next"
import React from "react"
import Layout from "../../../../../components/dashboard/layout"
import EditBlogCategorySection from "../../../../../components/dashboard/sections/blog/category/edit-blog-category"

const EditBlogCategory: NextPage = () => {
  return (
    <Layout currentMenu="Edit Blog Category">
      <EditBlogCategorySection />
    </Layout>
  )
}

export default EditBlogCategory
