import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import ProjectSection from "../../../components/dashboard/sections/project"

const Project: NextPage = () => {
  return (
    <Layout currentMenu="Projects">
      <ProjectSection />
    </Layout>
  )
}

export default Project
