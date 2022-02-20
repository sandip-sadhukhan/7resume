import { Box, Heading, HStack, VStack } from "@chakra-ui/react"
import React from "react"
import { FiMail } from "react-icons/fi"
import { MdCall } from "react-icons/md"
import { RiMapPin2Fill } from "react-icons/ri"
import ContactBox from "./ContactBox"

interface Props {
  grayBackground: string
  secondaryColor: string
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
            primaryText="(+91) 9999999999"
            secondaryText="(+91) 9999999999"
          />
          <ContactBox
            secondaryColor={props.secondaryColor}
            icon={FiMail}
            title="Email"
            primaryText="info@domain.com"
            secondaryText="name@domain.com"
          />
          <ContactBox
            secondaryColor={props.secondaryColor}
            icon={RiMapPin2Fill}
            title="Address"
            primaryText="123 Barjora Road"
            secondaryText="West Bengal, India"
          />
        </HStack>
      </Box>
    </VStack>
  )
}

export default ContactInfo
