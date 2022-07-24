import { HStack, Skeleton, Td, Tr } from "@chakra-ui/react"
import React from "react"

const ProjectCategorySkeleton: React.FC = () => {
  return (
    <Tr w="full">
      <Td w="28%">
        <HStack
          w="full"
          align="start"
          alignItems="center"
          flexDir={["column", "row", "row", "row", "row"]}
          gap={2}
          spacing={[0, 2, 2, 2, 2]}
        >
          <Skeleton width="30%" height={3} />
        </HStack>
      </Td>
      <Td>
        <HStack
          w="full"
          align="start"
          flexDir={["column", "row", "row", "row", "row"]}
          gap={2}
          spacing={[0, 2, 2, 2, 2]}
        >
          <Skeleton height={8} width={20} />
          <Skeleton height={8} width={20} />
        </HStack>
      </Td>
    </Tr>
  )
}

export default ProjectCategorySkeleton
