import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import SkillCategorySection from "../../../../components/dashboard/sections/skills/category"

const SkillCategory: NextPage = () => {
  return (
    <Layout currentMenu="Skill Categories">
      <SkillCategorySection />
    </Layout>
  )
}

export default SkillCategory
