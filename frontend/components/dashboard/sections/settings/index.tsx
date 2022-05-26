import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import dynamic from "next/dynamic"
import React from "react"
import { AiOutlineBarChart } from "react-icons/ai"
import { FaCogs, FaHome } from "react-icons/fa"
// import GeneralSettings from "./general-settings"
// import Seo from "./SEO"
// import WebsiteSettings from "./website-settings"

const SettingsSection: React.FC = () => {
  const bgColor = useColorModeValue("white", "gray.700")
  const unSelectedBg = useColorModeValue("blackAlpha.50", "whiteAlpha.50")

  const WebsiteSettings = dynamic(() => import("./website-settings"))
  const GeneralSettings = dynamic(() => import("./general-settings"))
  const SEOSettings = dynamic(() => import("./SEO"))

  return (
    <>
      <Head>
        <title>Settings | Dashboard</title>
      </Head>
      <Tabs isFitted variant="enclosed" w="full">
        <TabList gap={2}>
          <Tab
            _focus={{ ring: 0 }}
            bgColor={unSelectedBg}
            _selected={{ bg: bgColor }}
          >
            <VStack w="full">
              <FaHome />
              <Text fontSize={13}>Website Settings</Text>
            </VStack>
          </Tab>

          <Tab
            _focus={{ ring: 0 }}
            bgColor={unSelectedBg}
            _selected={{ bg: bgColor }}
          >
            <VStack w="full">
              <FaCogs />
              <Text fontSize={13}>General Settings</Text>
            </VStack>
          </Tab>

          <Tab
            _focus={{ ring: 0 }}
            bgColor={unSelectedBg}
            _selected={{ bg: bgColor }}
          >
            <VStack w="full">
              <AiOutlineBarChart />
              <Text fontSize={13}>SEO</Text>
            </VStack>
          </Tab>
        </TabList>

        <VStack
          bgColor={bgColor}
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
              <SEOSettings />
            </TabPanel>
          </TabPanels>
        </VStack>
      </Tabs>
    </>
  )
}

export default SettingsSection
