import React from "react"
import Layout from "../../components/dashboard/layout"
import AboutMeSection from "../../components/dashboard/sections/about-me"

const AboutMe: React.FC = () => {
  return (
    <Layout currentMenu="About Me">
      <AboutMeSection />
    </Layout>
  )
}

export default AboutMe
