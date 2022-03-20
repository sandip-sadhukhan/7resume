import { NextPage } from "next"
import React from "react"
import Layout from "../../../../../components/dashboard/layout"
import ViewRequestedAppointment from "../../../../../components/dashboard/sections/appointments/view-requested-appointments"

const RequestedAppointments: NextPage = () => {
  return (
    <Layout currentMenu="View Requested Section">
      <ViewRequestedAppointment />
    </Layout>
  )
}

export default RequestedAppointments
