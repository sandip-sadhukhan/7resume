import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { BsDownload } from "react-icons/bs"
import Experience from "./Experience"

interface HistoryProps {
  secondaryColor: string
  grayBackground: string
  grayText: string
  hasResume: boolean
  title: string
}

const History: React.FC<HistoryProps> = (props: HistoryProps) => {
  const { grayBackground, grayText, secondaryColor, hasResume, title } = props

  return (
    <VStack w="full">
      <HStack
        justifyContent="space-between"
        w="full"
        pt={5}
        flexDir={["column", "column", "column", "row", "row"]}
        gap={4}
      >
        <Heading as="h3" size="lg">
          {title}
        </Heading>
        {hasResume ? (
          <Button
            shadow="lg"
            bgColor={secondaryColor}
            color="white"
            rounded="full"
          >
            <BsDownload />
            <Text pl={2}>Download Resume</Text>
          </Button>
        ) : null}
      </HStack>
      <VStack py={10} align="start" spacing={4} gap={4}>
        <Experience
          secondaryColor={secondaryColor}
          grayBackground={grayBackground}
          grayText={grayText}
          instituteLogo="/company.png"
          date="Feb 2017 - Current"
          position="Software Developer"
          institute="MicroSoft"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, fugit. Libero accusantium esse sapiente facere voluptatum nam placeat ducimus beatae!"
        />
        <Experience
          secondaryColor={secondaryColor}
          grayBackground={grayBackground}
          grayText={grayText}
          instituteLogo="/company.png"
          date="Feb 2017 - Current"
          position="Software Developer"
          institute="MicroSoft"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, fugit. Libero accusantium esse sapiente facere voluptatum nam placeat ducimus beatae!"
        />
        <Experience
          secondaryColor={secondaryColor}
          grayBackground={grayBackground}
          grayText={grayText}
          instituteLogo="/company.png"
          date="Feb 2017 - Current"
          position="Software Developer"
          institute="MicroSoft"
          description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, fugit. Libero accusantium esse sapiente facere voluptatum nam placeat ducimus beatae!"
        />
      </VStack>
    </VStack>
  )
}

export default History
