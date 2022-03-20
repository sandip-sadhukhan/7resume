import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditService from "../../../../components/dashboard/sections/services/edit-service"

const ServiceEdit: NextPage = () => {
  return (
    <Layout currentMenu="Edit Service">
      <EditService />
    </Layout>
  )
}

export default ServiceEdit
