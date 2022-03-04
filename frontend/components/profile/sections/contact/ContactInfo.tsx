import { Box, Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { FiMail } from "react-icons/fi"
import { MdCall } from "react-icons/md"
import { RiMapPin2Fill } from "react-icons/ri"
import ContactBox from "./ContactBox"

interface Props {
  grayBackground: string
  secondaryColor: string
  phone: string
  email: string
  address: string
}

const ContactInfo = (props: Props) => {
  return (
    <VStack py={16} w="full" align="start">
      <Heading as="h3" fontSize={[20, 20, 20, 30, 30]} pb={5}>
        Contact Information
      </Heading>
      <Box bgColor={props.grayBackground} p={10} w="full">
        <HStack
          spacing={[0, 0, 0, 4, 8]}
          gap={4}
          w="full"
          flexDir={["column", "column", "column", "row", "row"]}
        >
          <ContactBox
            secondaryColor={props.secondaryColor}
            icon={MdCall}
            title="Phone"
            description={props.phone}
          />
          <ContactBox
            secondaryColor={props.secondaryColor}
            icon={FiMail}
            title="Email"
            description={props.email}
          />
          <ContactBox
            secondaryColor={props.secondaryColor}
            icon={RiMapPin2Fill}
            title="Address"
            description={props.address}
          />
        </HStack>
      </Box>
    </VStack>
  )
}

export default ContactInfo
