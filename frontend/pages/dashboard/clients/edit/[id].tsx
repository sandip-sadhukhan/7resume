import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import EditClientSection from "../../../../components/dashboard/sections/clients/edit-clients"

const EditClient: NextPage = () => {
  return (
    <Layout currentMenu="Clients">
      <EditClientSection />
    </Layout>
  )
}

export default EditClient
