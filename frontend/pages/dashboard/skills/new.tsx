import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewSkillSection from "../../../components/dashboard/sections/skills/new-skill"

const NewSkill: NextPage = () => {
  return (
    <Layout currentMenu="New Skill">
      <NewSkillSection />
    </Layout>
  )
}

export default NewSkill
