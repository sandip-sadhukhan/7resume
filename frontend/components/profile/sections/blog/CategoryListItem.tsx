import { HStack, Text } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"

interface CategoryListItemProps {
  secondaryColor: string
  grayText: string
  categoryName: string
  categoryCount: number
}

const CategoryListItem: React.FC<CategoryListItemProps> = (
  props: CategoryListItemProps
) => {
  const { secondaryColor, grayText, categoryName, categoryCount } = props
  return (
    <HStack w="full" justifyContent="space-between" px={1}>
      <Link href="#">
        <a>
          <Text
            fontSize={14}
            color={grayText}
            _hover={{ color: secondaryColor }}
          >
            {categoryName}
          </Text>
        </a>
      </Link>
      <Link href="#">
        <a>
          <Text
            fontSize={14}
            color={grayText}
            _hover={{ color: secondaryColor }}
          >
            ({categoryCount})
          </Text>
        </a>
      </Link>
    </HStack>
  )
}

export default CategoryListItem
