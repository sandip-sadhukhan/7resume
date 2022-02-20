import { Button, Flex, HStack, Image, Input, Textarea } from "@chakra-ui/react"
import React from "react"

interface Props {
  secondaryColor: string
}

const Hero = (props: Props) => {
  return (
    <HStack
      py={10}
      gap={4}
      spacing={[0, 0, 2, 4, 8]}
      flexDir={["column", "column", "column", "row", "row"]}
      w="full"
    >
      <Flex>
        <Image src="/mailbox.png" alt="MailBox" />
      </Flex>
      <Flex>
        <form>
          <Input
            type="text"
            variant="flushed"
            placeholder="Name"
            required
            autoFocus
            mb={8}
            size="lg"
          />
          <Input
            type="email"
            variant="flushed"
            placeholder="Email"
            size="lg"
            required
            mb={8}
          />
          <Textarea
            rows={6}
            size="lg"
            variant="flushed"
            placeholder="Message"
            mb={8}
          />
          <Button
            size="lg"
            w="full"
            type="submit"
            bgColor={props.secondaryColor}
            color="white"
          >
            Send Message
          </Button>
        </form>
      </Flex>
    </HStack>
  )
}

export default Hero
