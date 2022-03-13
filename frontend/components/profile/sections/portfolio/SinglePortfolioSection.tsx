import {
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Image,
} from "@chakra-ui/react"
import Head from "next/head"
import dayjs from "dayjs"
import { useRouter } from "next/router"
import React from "react"
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa"
import {
  BreadcrumbType,
  SinglePortfolioSectionProps,
} from "../../../../types/profile"
import HeadingBreadcrumb from "./HeadingBreadcrumb"
import Project from "./Project"

const SinglePortfolioSection: React.FC<SinglePortfolioSectionProps> = (
  props: SinglePortfolioSectionProps
) => {
  const router = useRouter()
  const username = router.query.username as string

  const {
    // slug,
    category_name,
    title,
    description,
    featured_image_path,
    link,
    meta_description,
    published,
  } = props.portfolio

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const transparentSecondaryColor = useColorModeValue(
    "rgba(247, 183, 51, .8)",
    "rgba(0, 198, 255, .8)"
  )
  const grayBackground = useColorModeValue("blue.50", "gray.700")

  const portfolioBreadCrumbList: BreadcrumbType[] = [
    {
      text: "Portfolio",
      link: `/u/${username}/portfolio`,
    },
    {
      text: category_name,
      // link: `/${username}/category/${category_name}`,
    },
    {
      text: title,
      // link: `/${username}/${slug}`,
    },
  ]

  return (
    <VStack
      align="start"
      justifyContent="center"
      pt={[5, 5, 5, 10, 10]}
      px={[5, 5, 5, 16, 16]}
      w={["95%", "95%", "95%", "full", "full"]}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={meta_description} />
      </Head>
      {/* Heading & Breadcrumb */}
      <HeadingBreadcrumb
        grayBackground={grayBackground}
        homePageLink={`/u/${username}`}
        breadcrumbList={portfolioBreadCrumbList}
        title="Portfolio"
      />

      {/* Header Image & Text */}
      <VStack w="full" pt={6}>
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 500,
          }}
        >
          <Image
            w="100%"
            src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${featured_image_path}`}
            alt="portfolio image"
            h="100%"
          />
          <VStack
            pos="absolute"
            top={0}
            left={0}
            zIndex={10}
            bgColor={transparentSecondaryColor}
            h="100%"
            w={["100%", "100%", "100%", "50%"]}
            pl={10}
            alignItems="start"
            justifyContent="center"
            color="white"
          >
            <VStack align="start" w="full">
              <Text>Websites</Text>
              <Heading>Office Decoration</Heading>
            </VStack>

            <VStack align="start" w="full" pt={10}>
              <Text>
                <b>Published: </b> {dayjs(published).format("MMM DD, YYYY")}
              </Text>
              <Text>
                <b>Demo: </b>
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Text>
            </VStack>
            <HStack align="start" w="full" spacing={8} pt={10}>
              <FaFacebookF />
              <FaTwitter />
              <FaPinterestP />
            </HStack>
          </VStack>
        </div>
      </VStack>

      {/* Blog Content */}
      <VStack w="full" align="start" py={12}>
        <Text whiteSpace="pre-wrap">{description}</Text>
      </VStack>

      {/* Related Projects */}
      {props.related_projects.length > 0 ? (
        <VStack w="full" align="start">
          <Heading>Related Projects</Heading>
          <SimpleGrid columns={[1, 1, 1, 2, 2]} w="full" py={10} spacing={8}>
            {props.related_projects.map((project) => (
              <Project
                key={project.id}
                category={project.category_name}
                imageURL={project.featured_image_path}
                name={project.title}
                secondaryColor={secondaryColor}
                slug={project.slug}
              />
            ))}
          </SimpleGrid>
        </VStack>
      ) : null}
    </VStack>
  )
}

export default SinglePortfolioSection
