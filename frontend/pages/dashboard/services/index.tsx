import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import ServicesSection from "../../../components/dashboard/sections/services"

const Service: NextPage = () => {
  return (
    <Layout currentMenu="Services">
      <ServicesSection />
    </Layout>
  )
}

export default Service
