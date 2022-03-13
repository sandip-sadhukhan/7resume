import { HStack, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useRouter } from "next/router"
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
  const username = useRouter().query.username as string

  const { secondaryColor, grayText, categoryName, categoryCount } = props
  return (
    <HStack w="full" justifyContent="space-between" px={1}>
      <Link
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/u/${username}/blog/category/${categoryName}`}
      >
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
      <Link
        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/u/${username}/blog/category/${categoryName}`}
      >
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
