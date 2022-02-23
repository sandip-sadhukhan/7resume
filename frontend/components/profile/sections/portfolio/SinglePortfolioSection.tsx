import {
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
  Image,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa"
import { BreadcrumbType } from "../../../../types/profile"
import HeadingBreadcrumb from "./HeadingBreadcrumb"
import Project from "./Project"

const SinglePortfolioSection = () => {
  const router = useRouter()
  const username = router.query.username as string
  const slug = router.query.slug as string

  const secondaryColor = useColorModeValue("#f7b733", "#00c6ff")
  const transparentSecondaryColor = useColorModeValue(
    "rgba(247, 183, 51, .8)",
    "rgba(0, 198, 255, .8)"
  )
  const grayBackground = useColorModeValue("blue.50", "gray.700")

  const portfolioBreadCrumbList: BreadcrumbType[] = [
    {
      text: "Portfolio",
      link: `/${username}/portfolio`,
    },
    {
      text: "Office Decoration",
      link: `/${username}/portfolio/${slug}`,
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
      {/* Heading & Breadcrumb */}
      <HeadingBreadcrumb
        grayBackground={grayBackground}
        homePageLink={`/${username}`}
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
            src="/portfolio-img.jpeg"
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
                <b>Published: </b> Jan 04, 2019
              </Text>
              <Text>
                <b>Demo: </b> www.elmanaway.info
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
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex non
          maiores quae beatae blanditiis a quaerat culpa voluptate labore enim.
          Hic, porro doloremque nostrum iusto qui enim dolore quibusdam nisi
          molestiae eos aliquam vel libero corporis inventore fugit et tempore
          nesciunt iure, quisquam aut voluptas omnis. Quasi necessitatibus quod
          labore repellat. Ipsam atque reiciendis optio quos ex? Autem facilis
          iste unde illum qui voluptatem maiores, explicabo eaque ea tenetur
          exercitationem quidem sed officiis suscipit numquam in culpa sit
          excepturi quo. Sequi officiis nulla mollitia molestias at sit commodi.
          Magni saepe dolore voluptate natus quaerat expedita similique quidem
          doloribus quos ipsum.
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid ipsa
          rem nostrum id est cupiditate aperiam quis dignissimos quam enim
          itaque distinctio sunt deserunt, quo nulla, animi possimus accusantium
          nemo. Deserunt non quasi assumenda consequatur. Voluptate aperiam
          impedit minima, nemo praesentium modi molestiae aliquam adipisci
          asperiores, exercitationem magnam quos placeat.
        </Text>
      </VStack>

      {/* Related Projects */}
      <VStack w="full" align="start">
        <Heading>Related Projects</Heading>
        <SimpleGrid columns={[1, 1, 1, 2, 2]} w="full" py={10} spacing={8}>
          <Project
            category="Websites"
            imageURL="/portfolio-img.jpeg"
            name="Company Branding"
            secondaryColor={secondaryColor}
            slug="hello"
          />
          <Project
            category="Websites"
            imageURL="/portfolio-img.jpeg"
            name="Company Branding"
            secondaryColor={secondaryColor}
            slug="hello"
          />
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}

export default SinglePortfolioSection
