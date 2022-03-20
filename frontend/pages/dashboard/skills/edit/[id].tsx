import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditSkillSection from "../../../../components/dashboard/sections/skills/edit-skill"

const EditSkill: NextPage = () => {
  return (
    <Layout currentMenu="Edit Project">
      <EditSkillSection />
    </Layout>
  )
}

export default EditSkill
