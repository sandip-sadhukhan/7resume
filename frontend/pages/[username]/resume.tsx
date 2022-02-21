import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import ResumeSection from "../../components/profile/sections/resume"

const Resume: NextPage = () => {
  return (
    <Layout>
      <ResumeSection />
    </Layout>
  )
}

export default Resume
