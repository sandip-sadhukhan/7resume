import { Text, VStack } from "@chakra-ui/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"

interface ProjectProps {
  secondaryColor: string
  imageURL: string
  name: string
  category: string
  slug: string
}

const Project: React.FC<ProjectProps> = (props: ProjectProps) => {
  const router = useRouter()
  const username = router.query.username as string

  const { secondaryColor, slug, imageURL, name, category } = props
  return (
    <VStack spacing={3}>
      <Link href={`/${username}/portfolio/${slug}`} p>
        <a style={{ width: "100%", height: 350, position: "relative" }}>
          <Image src={imageURL} alt="portfolio image" layout="fill" />
        </a>
      </Link>
      <VStack spacing={0}>
        <Text color={secondaryColor} fontWeight={500} fontSize={20}>
          {name}
        </Text>
        <Text fontSize={15}>{category}</Text>
      </VStack>
    </VStack>
  )
}

export default Project
