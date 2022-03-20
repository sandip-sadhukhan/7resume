import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import NewSkillCategorySection from "../../../../components/dashboard/sections/skills/category/new-skill-category"

const NewSkillCategory: NextPage = () => {
  return (
    <Layout currentMenu="New Skill Category">
      <NewSkillCategorySection />
    </Layout>
  )
}

export default NewSkillCategory
