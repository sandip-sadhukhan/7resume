import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import React from "react"
import { BiTime } from "react-icons/bi"
import { FaUser } from "react-icons/fa"
import { FiEdit2, FiMail } from "react-icons/fi"
import { MdCall, MdDateRange } from "react-icons/md"

interface Props {
  secondaryColor: string
}

const AppointmentForm = ({ secondaryColor }: Props) => {
  return (
    <VStack flex={1} pt={10} gap={4}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiEdit2 color="gray.300" />
        </InputLeftElement>
        <Input variant="outline" w="full" type="text" placeholder="Subject" />
      </InputGroup>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FaUser color="gray.300" />
        </InputLeftElement>
        <Input variant="outline" w="full" type="text" placeholder="Name" />
      </InputGroup>
      <HStack w="full">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <FiMail color="gray.300" />
          </InputLeftElement>
          <Input variant="outline" w="full" type="email" placeholder="Email" />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdCall color="gray.300" />
          </InputLeftElement>
          <Input variant="outline" w="full" type="tel" placeholder="Phone" />
        </InputGroup>
      </HStack>
      <HStack w="full">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdDateRange color="gray.300" />
          </InputLeftElement>
          <Input variant="outline" w="full" type="date" placeholder="Date" />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <BiTime color="gray.300" />
          </InputLeftElement>
          <Input variant="outline" w="full" type="time" placeholder="Time" />
        </InputGroup>
      </HStack>
      <Textarea rows={6} placeholder="Message" />
      <Button
        bgColor={secondaryColor}
        color="white"
        w="full"
        rounded="full"
        size="lg"
      >
        Booking appointment
      </Button>
    </VStack>
  )
}

export default AppointmentForm
