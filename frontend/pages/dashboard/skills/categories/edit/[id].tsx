import { NextPage } from "next"
import React from "react"
import Layout from "../../../../../components/dashboard/layout"
import EditSkillCategorySection from "../../../../../components/dashboard/sections/skills/category/edit-skill-category"

const EditSkillCategory: NextPage = () => {
  return (
    <Layout currentMenu="Edit Skill Category">
      <EditSkillCategorySection />
    </Layout>
  )
}

export default EditSkillCategory
