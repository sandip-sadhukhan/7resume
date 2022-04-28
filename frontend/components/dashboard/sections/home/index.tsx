import {
  Divider,
  Heading,
  SimpleGrid,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { AiFillMessage, AiOutlineProject } from "react-icons/ai"
import axios from "../../../../utils/axiosInstance"
import { FaBloggerB, FaRegEye } from "react-icons/fa"
import { MdPeople, MdWork } from "react-icons/md"
import { VscFeedback } from "react-icons/vsc"
import { RiCustomerService2Fill } from "react-icons/ri"
import StatisticsBox from "./statictics-box"
import Head from "next/head"
import { withAuth } from "../../../../auth/context"
import { IState } from "../../../../types/auth"

interface HomeSectionProps {
  state: IState
}

const Home: React.FC<HomeSectionProps> = (props: HomeSectionProps) => {
  const bgColor = useColorModeValue("white", "gray.700")

  interface IFetchData {
    views: number
    services: number
    clients: number
    projects: number
    blog_posts: number
    testimonials: number
    skills: number
    messages: number
  }

  const [data, setData] = useState<IFetchData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/dashboard/statistics/", {
        headers: {
          Authorization: `Bearer ${props.state.user?.access}`,
        },
      })
      const data: IFetchData = response.data

      setData({ ...data })
    }

    fetchData()
  }, [props.state.user?.access])

  return (
    <VStack
      bgColor={bgColor}
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
          max={1000}
          valueCount={data?.views}
          bg="blackAlpha.800"
        />
        <StatisticsBox
          Icon={RiCustomerService2Fill}
          name="services"
          max={10}
          valueCount={data?.services}
          bg="tomato"
        />
        <StatisticsBox
          Icon={MdPeople}
          name="clients"
          max={10}
          valueCount={data?.clients}
          bg="teal.400"
        />
        <StatisticsBox
          Icon={AiOutlineProject}
          name="projects"
          max={10}
          valueCount={data?.projects}
          bg="green.400"
        />
        <StatisticsBox
          Icon={FaBloggerB}
          name="blog posts"
          max={10}
          valueCount={data?.blog_posts}
          bg="purple.600"
        />
        <StatisticsBox
          Icon={VscFeedback}
          name="testimonials"
          max={6}
          valueCount={data?.testimonials}
          bg="blue.400"
        />
        <StatisticsBox
          Icon={MdWork}
          name="skills"
          max={6}
          valueCount={data?.skills}
          bg="red"
        />
        <StatisticsBox
          Icon={AiFillMessage}
          name="messages"
          max={10}
          valueCount={data?.messages}
          bg="orange"
        />
      </SimpleGrid>
    </VStack>
  )
}

export default withAuth(Home)
