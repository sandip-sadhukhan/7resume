import { Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { EducationType } from "../../../../types/profile"
import Experience from "./Experience"

interface BackgroundHistoryProps {
  secondaryColor: string
  grayBackground: string
  grayText: string
  educations: EducationType[]
}

const BackgroundHistory: React.FC<BackgroundHistoryProps> = (
  props: BackgroundHistoryProps
) => {
  const { grayBackground, grayText, secondaryColor, educations } = props

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
          Background History
        </Heading>
      </HStack>
      <VStack py={10} align="start" spacing={4} gap={4} w="full">
        {educations.map((education) => (
          <Experience
            key={education.id}
            secondaryColor={secondaryColor}
            grayBackground={grayBackground}
            grayText={grayText}
            instituteLogo={education.image_path}
            position={education.field}
            institute={education.school}
            description={education.description}
            date_from={education.date_from}
            date_to={education.date_to}
            is_current={education.currently_studying}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default BackgroundHistory
