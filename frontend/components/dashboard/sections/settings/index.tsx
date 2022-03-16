import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import React from "react"
import { AiOutlineBarChart } from "react-icons/ai"
import { FaCogs, FaHome } from "react-icons/fa"
import GeneralSettings from "./general-settings"
import Seo from "./SEO"
import WebsiteSettings from "./website-settings"

const SettingsSection: React.FC = () => {
  return (
    <>
      <Head>
        <title>Settings | Dashboard</title>
      </Head>
      <Tabs isFitted variant="enclosed" w="full">
        <TabList gap={2}>
          <Tab
            _focus={{ ring: 0 }}
            bgColor="blackAlpha.200"
            _selected={{ bg: "white" }}
          >
            <VStack w="full">
              <FaHome />
              <Text fontSize={13}>Website Settings</Text>
            </VStack>
          </Tab>

          <Tab
            _focus={{ ring: 0 }}
            bgColor="blackAlpha.50"
            _selected={{ bg: "white" }}
          >
            <VStack w="full">
              <FaCogs />
              <Text fontSize={13}>General Settings</Text>
            </VStack>
          </Tab>

          <Tab
            _focus={{ ring: 0 }}
            bgColor="blackAlpha.50"
            _selected={{ bg: "white" }}
          >
            <VStack w="full">
              <AiOutlineBarChart />
              <Text fontSize={13}>SEO</Text>
            </VStack>
          </Tab>
        </TabList>

        <VStack
          bgColor="white"
          w="full"
          align="start"
          py={10}
          px={8}
          shadow="sm"
          rounded="sm"
        >
          <TabPanels>
            {/* Website Settings */}
            <TabPanel p={0}>
              <WebsiteSettings />
            </TabPanel>

            {/* General Settings */}
            <TabPanel p={0}>
              <GeneralSettings />
            </TabPanel>

            {/* SEO */}
            <TabPanel p={0}>
              <Seo />
            </TabPanel>
          </TabPanels>
        </VStack>
      </Tabs>
    </>
  )
}

export default SettingsSection
