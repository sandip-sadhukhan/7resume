import type { NextPage } from "next"
import Layout from "../../../../components/profile/Layout"
import SinglePortfolioSection from "../../../../components/profile/sections/portfolio/SinglePortfolioSection"
import { IErrorProps } from "../../../../types/pages"
import {
  LayoutProps,
  SinglePortfolioSectionProps,
} from "../../../../types/profile"
import fetchData from "../../../../utils/fetchData"
import Error from "../../../error"

interface SinglePortfolioPageProps {
  error?: IErrorProps
  display_portfolio: boolean
  layout: LayoutProps
  section: SinglePortfolioSectionProps
}

const SinglePortfolio: NextPage<SinglePortfolioPageProps> = (
  props: SinglePortfolioPageProps
) => {
  const { error, display_portfolio, layout, section } = props

  if (error || !display_portfolio) {
    return <Error {...error} />
  }

  return (
    <Layout layoutProps={layout}>
      <SinglePortfolioSection {...section} />
    </Layout>
  )
}

export const getServerSideProps = async (context: {
  params: { username: string; slug: string }
}) => {
  const username = context.params.username as string
  const slug = context.params.slug as string

  const api = `/api/profile/${username}/portfolio/${slug}/`
  const data = fetchData(api)

  return data
}

export default SinglePortfolio
