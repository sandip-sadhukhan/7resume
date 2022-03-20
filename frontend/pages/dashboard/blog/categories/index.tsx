import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import BlogCategorySection from "../../../../components/dashboard/sections/blog/category"

const BlogCategory: NextPage = () => {
  return (
    <Layout currentMenu="Blog Categories">
      <BlogCategorySection />
    </Layout>
  )
}

export default BlogCategory
