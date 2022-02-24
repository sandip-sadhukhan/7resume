import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import BlogSection from "../../components/profile/sections/blog"

const Blog: NextPage = () => {
  return (
    <Layout>
      <BlogSection />
    </Layout>
  )
}

export default Blog
