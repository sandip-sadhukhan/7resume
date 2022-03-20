import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditBlogSection from "../../../../components/dashboard/sections/blog/edit-blog"

const EditBlog: NextPage = () => {
  return (
    <Layout currentMenu="Edit Blog">
      <EditBlogSection />
    </Layout>
  )
}

export default EditBlog
