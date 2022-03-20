import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import ProjectCategorySection from "../../../../components/dashboard/sections/project/category"

const ProjectCategory: NextPage = () => {
  return (
    <Layout currentMenu="Project Categories">
      <ProjectCategorySection />
    </Layout>
  )
}

export default ProjectCategory
