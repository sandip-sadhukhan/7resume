import type { NextPage } from "next"
import Layout from "../../../components/profile/Layout"
import SinglePortfolioSection from "../../../components/profile/sections/portfolio/SinglePortfolioSection"
import {
  LayoutProps,
  SinglePortfolioSectionProps,
} from "../../../types/profile"

interface SinglePortfolioPageProps {
  display_portfolio: boolean
  layout: LayoutProps
  section: SinglePortfolioSectionProps
}

const SinglePortfolio: NextPage<SinglePortfolioPageProps> = (
  props: SinglePortfolioPageProps
) => {
  return (
    <Layout layoutProps={props.layout}>
      <SinglePortfolioSection {...props.section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string; slug: string }
}) => {
  const username = context.params.username as string
  const slug = context.params.slug as string
  // Fetch data from API
  const url = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/profile/${username}/portfolio/${slug}/`

  const res = await fetch(url)
  const data = await res.json()

  return {
    props: { ...data.data },
  }
}

export default SinglePortfolio
