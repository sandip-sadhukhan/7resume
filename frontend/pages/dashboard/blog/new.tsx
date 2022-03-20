import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewBlogSection from "../../../components/dashboard/sections/blog/new-blog"

const NewBlog: NextPage = () => {
  return (
    <Layout currentMenu="New Blog">
      <NewBlogSection />
    </Layout>
  )
}

export default NewBlog
