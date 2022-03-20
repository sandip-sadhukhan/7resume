import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import BlogSection from "../../../components/dashboard/sections/blog"

const Blog: NextPage = () => {
  return (
    <Layout currentMenu="Blog">
      <BlogSection />
    </Layout>
  )
}

export default Blog
