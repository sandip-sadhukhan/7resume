import type { NextPage } from "next"
import Layout from "../../components/profile/Layout"
import AppointmentSection from "../../components/profile/sections/appointments"

const Appointments: NextPage = () => {
  return (
    <Layout>
      <AppointmentSection />
    </Layout>
  )
}

export default Appointments
