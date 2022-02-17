import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import AboutSection from "../../components/profile/sections/about/AboutSection"

const AboutMe: NextPage = () => {
  return (
    <Layout>
      <AboutSection />
    </Layout>
  )
}

export default AboutMe
