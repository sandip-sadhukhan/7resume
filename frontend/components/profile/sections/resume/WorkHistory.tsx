import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import React from "react"
import { BsDownload } from "react-icons/bs"
import { ExperienceType } from "../../../../types/profile"
import Experience from "./Experience"

interface WorkHistoryProps {
  secondaryColor: string
  grayBackground: string
  grayText: string
  resume: string | null
  experiences: ExperienceType[]
}

const WorkHistory: React.FC<WorkHistoryProps> = (props: WorkHistoryProps) => {
  const { grayBackground, grayText, secondaryColor, resume, experiences } =
    props

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
          Work History
        </Heading>
        {resume !== null ? (
          <Button
            as="a"
            href={`${process.env.NEXT_PUBLIC_BASE_API_URL}${resume}`}
            target="_blank"
            download
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
      <VStack py={10} align="start" spacing={4} gap={4} w="full">
        {experiences.map((experience) => (
          <Experience
            key={experience.id}
            secondaryColor={secondaryColor}
            grayBackground={grayBackground}
            grayText={grayText}
            instituteLogo={experience.image_path}
            position={experience.position}
            institute={experience.company}
            description={experience.description}
            date_from={experience.date_from}
            date_to={experience.date_to}
            is_current={experience.currently_working}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default WorkHistory
