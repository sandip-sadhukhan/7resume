import { NextPage } from "next"
import React from "react"
import Layout from "../../../../components/dashboard/layout"
import RequestedAppointmentsSection from "../../../../components/dashboard/sections/appointments/requested-appointments"

const RequestedAppointments: NextPage = () => {
  return (
    <Layout currentMenu="Requested Section">
      <RequestedAppointmentsSection />
    </Layout>
  )
}

export default RequestedAppointments
