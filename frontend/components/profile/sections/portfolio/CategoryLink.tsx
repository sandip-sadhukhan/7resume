import { Text, VStack } from "@chakra-ui/react"
import React from "react"

interface CategoryLinkProps {
  count: number
  categoryName: string
  categoryURL: string
  secondaryColor: string
  headingColor: string
  active?: boolean
}

const CategoryLink: React.FC<CategoryLinkProps> = (
  props: CategoryLinkProps
) => {
  const {
    categoryName,
    count,
    secondaryColor,
    headingColor,
    active = false,
  } = props
  return (
    <VStack align="center" spacing={0}>
      <Text
        textAlign="center"
        color={active ? secondaryColor : headingColor}
        fontSize={12}
      >
        ({count})
      </Text>
      <Text textAlign="center" color={active ? secondaryColor : headingColor}>
        {categoryName}
      </Text>
    </VStack>
  )
}

export default CategoryLink
