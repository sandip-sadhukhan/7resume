import { Divider, Heading, SimpleGrid, VStack } from "@chakra-ui/react"
import React from "react"
import { AiFillMessage, AiOutlineProject } from "react-icons/ai"
import { FaBloggerB, FaRegEye } from "react-icons/fa"
import { MdPeople, MdWork } from "react-icons/md"
import { VscFeedback } from "react-icons/vsc"
import { RiCustomerService2Fill } from "react-icons/ri"
import StatisticsBox from "./statictics-box"
import Head from "next/head"

const Home: React.FC = () => {
  return (
    <VStack
      bgColor="white"
      w="full"
      align="start"
      py={5}
      px={8}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>Home | Dashboard</title>
      </Head>
      <Heading pb={2} as="h3" size="md" fontWeight="normal">
        Statistics
      </Heading>
      <Divider bgColor="blackAlpha.500" borderWidth="1px" />

      <SimpleGrid
        py={5}
        color="white"
        w="full"
        columns={[1, 2, 3, 4, 4]}
        spacingX={7}
        spacingY={5}
      >
        <StatisticsBox
          Icon={FaRegEye}
          name="views"
          progressPercentage={85}
          valueCount={2586}
          bg="blackAlpha.800"
        />
        <StatisticsBox
          Icon={RiCustomerService2Fill}
          name="services"
          progressPercentage={35}
          valueCount={4}
          bg="tomato"
        />
        <StatisticsBox
          Icon={MdPeople}
          name="clients"
          progressPercentage={95}
          valueCount={9}
          bg="teal.400"
        />
        <StatisticsBox
          Icon={AiOutlineProject}
          name="projects"
          progressPercentage={85}
          valueCount={8}
          bg="green.400"
        />
        <StatisticsBox
          Icon={FaBloggerB}
          name="blog posts"
          progressPercentage={85}
          valueCount={18}
          bg="purple.600"
        />
        <StatisticsBox
          Icon={VscFeedback}
          name="testimonials"
          progressPercentage={90}
          valueCount={5}
          bg="blue.400"
        />
        <StatisticsBox
          Icon={MdWork}
          name="skills"
          progressPercentage={85}
          valueCount={8}
          bg="red"
        />
        <StatisticsBox
          Icon={AiFillMessage}
          name="messages"
          progressPercentage={85}
          valueCount={12}
          bg="orange"
        />
      </SimpleGrid>
    </VStack>
  )
}

export default Home
