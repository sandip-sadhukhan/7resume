import {
  Flex,
  FormControl,
  FormHelperText,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react"
import React from "react"
import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface SocialLinkProps {
  name: string
  error: FieldError | undefined
  register: UseFormRegisterReturn
}

const SocialLink: React.FC<SocialLinkProps> = (props: SocialLinkProps) => {
  const { name, error, register } = props

  return (
    <HStack
      align="start"
      w="full"
      spacing={[0, 0, 5, 5, 5]}
      flexDir={["column", "column", "row", "row", "row"]}
      gap={4}
    >
      <Flex flex={[1, 1, 1, 2, 2]} w="full">
        <Text
          w="full"
          fontSize={13}
          textAlign={["start", "start", "end", "end", "end"]}
          pt={2}
          textTransform="capitalize"
        >
          {name}
        </Text>
      </Flex>
      <Flex flex={[1, 1, 8, 8, 10]} w="full">
        <FormControl isInvalid={error !== undefined}>
          <Input
            w="full"
            size="sm"
            placeholder={`${name.toLowerCase()} profile url`}
            {...register}
          />
          {error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      </Flex>
    </HStack>
  )
}

export default SocialLink
