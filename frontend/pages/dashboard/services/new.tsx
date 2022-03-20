import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import NewServiceSection from "../../../components/dashboard/sections/services/new-service"

const NewService: NextPage = () => {
  return (
    <Layout currentMenu="New Services">
      <NewServiceSection />
    </Layout>
  )
}

export default NewService
