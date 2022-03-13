import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import AppointmentSection from "../../../components/profile/sections/appointments"
import { AppointmentSectionProps, LayoutProps } from "../../../types/profile"

interface AppointmentsProps {
  layout: LayoutProps
  section: AppointmentSectionProps
}

const Appointments: NextPage<AppointmentsProps> = (
  props: AppointmentsProps
) => {
  return (
    <Layout layoutProps={props.layout}>
      <AppointmentSection {...props.section} />
    </Layout>
  )
}
export const getServerSideProps = async (context: {
  params: { username: string }
}) => {
  const username = context.params.username as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/appointments/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default Appointments
