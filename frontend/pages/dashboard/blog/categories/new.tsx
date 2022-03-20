import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import NewBlogCategorySection from "../../../../components/dashboard/sections/blog/category/new-blog-category"

const NewBlogCategory: NextPage = () => {
  return (
    <Layout currentMenu="New Blog Category">
      <NewBlogCategorySection />
    </Layout>
  )
}

export default NewBlogCategory
