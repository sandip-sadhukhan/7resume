import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import SkillsSection from "../../../components/dashboard/sections/skills"

const Skills: NextPage = () => {
  return (
    <Layout currentMenu="Skills">
      <SkillsSection />
    </Layout>
  )
}

export default Skills
