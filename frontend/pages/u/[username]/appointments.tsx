import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import AppointmentSection from "../../../components/profile/sections/appointments"
import { AppointmentSectionProps, LayoutProps } from "../../../types/profile"
import Error from "../../error"

interface AppointmentsProps {
  success: boolean
  layout: LayoutProps
  section: AppointmentSectionProps
}

const Appointments: NextPage<AppointmentsProps> = (
  props: AppointmentsProps
) => {
  return (
    <>
      {props.success ? (
        <Layout layoutProps={props.layout}>
          <AppointmentSection {...props.section} />
        </Layout>
      ) : (
        <Error />
      )}
    </>
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
    props: { ...data.data, success: data.success },
  }
}

export default Appointments
