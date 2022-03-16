import {
  Button,
  Divider,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import React from "react"

const Seo: React.FC = () => {
  return (
    <VStack w="full" spacing={4} align="start">
      {/* SEO */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="start"
        as="form"
        // onSubmit={onSubmit}
      >
        <Text
          fontSize={14}
          w={["full", "full", 100, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
          color="gray"
        >
          Meta Description
        </Text>
        <HStack w="full" flex={1}>
          <Textarea
            size="sm"
            w="full"
            name="metaDescription"
            // value={siteTitle}
            // onChange={onChange}
          ></Textarea>
        </HStack>
      </HStack>

      <Divider />

      <HStack
        w={["full", "full", 240, 245, 295]}
        justifyContent={["start", "start", "end", "end", "end"]}
      >
        <Button size="sm" rounded={0} colorScheme="green">
          Save
        </Button>
        <Button size="sm" rounded={0} colorScheme="red">
          Cancel
        </Button>
      </HStack>
    </VStack>
  )
}

export default Seo
