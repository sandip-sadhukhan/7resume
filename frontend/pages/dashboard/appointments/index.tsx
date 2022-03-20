import { NextPage } from "next"
import React from "react"
import Layout from "../../../components/dashboard/layout"
import AppointmentsSection from "../../../components/dashboard/sections/appointments"

const Appointments: NextPage = () => {
  return (
    <Layout currentMenu="Messages">
      <AppointmentsSection />
    </Layout>
  )
}

export default Appointments
