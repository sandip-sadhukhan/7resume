import {
  Button,
  Divider,
  Heading,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import {
  FaCalendar,
  FaChevronLeft,
  FaEnvelopeOpen,
  FaHistory,
  FaPhone,
  FaUser,
} from "react-icons/fa"

const ViewRequestedAppointment = () => {
  const bgColor = useColorModeValue("white", "gray.700")
  const textColor = useColorModeValue("gray.600", "gray.400")
  const router = useRouter()

  return (
    <VStack
      bgColor={bgColor}
      w="full"
      align="start"
      py={10}
      px={[5, 5, 8, 10, 10]}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>View Requested Appointments | Dashboard</title>
      </Head>

      <VStack w="full" align="start">
        <VStack pb={4}>
          <Button
            onClick={() => router.back()}
            size="sm"
            rounded={0}
            colorScheme="gray"
          >
            <FaChevronLeft fontSize={13} />
            <Text ps={1} fontSize={13}>
              Back
            </Text>
          </Button>
        </VStack>

        <VStack w="full" align="start" spacing={2} fontSize={14} pb={3}>
          <Heading size="lg" fontWeight="normal">
            Redesign of my website
          </Heading>
          <HStack fontSize={13}>
            <FaHistory color="gray" fontSize={13} />
            <Text color="gray.400" fontWeight="light">
              Created: 2020-06-12 00:29:06
            </Text>
          </HStack>
        </VStack>

        <Divider />

        <HStack
          fontSize={13}
          color={textColor}
          spacing={[0, 0, 8, 10, 10]}
          gap={3}
          py={3}
          flexDir={["column", "column", "row", "row", "row"]}
          align="start"
        >
          <HStack>
            <FaUser />
            <Text>Sandip Sadhukhan</Text>
          </HStack>
          <HStack>
            <FaPhone />
            <Text>+91 9282683927</Text>
          </HStack>
          <HStack>
            <FaEnvelopeOpen />
            <Text>sandip.sendme@gmail.com</Text>
          </HStack>
          <HStack>
            <FaCalendar />
            <Text>06/22/2020 - 3:28 pm</Text>
          </HStack>
        </HStack>

        <Divider />
        <Text
          py={5}
          fontSize={14}
          lineHeight="tall"
          letterSpacing="wide"
          whiteSpace="pre-wrap"
        >
          Dear Sir, Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Dolor laboriosam consectetur est explicabo dolores, iure, ipsum sequi
          esse, minus quasi eos maxime suscipit rerum eius excepturi corrupti.
          Dolor architecto nulla beatae recusandae qui maxime! Voluptatem quo
          fugiat asperiores amet veniam expedita labore corrupti vero voluptas
          dicta officiis, eos nobis exercitationem ipsum saepe atque perferendis
          nisi? Iste excepturi iure minima. Voluptatem neque mollitia hic, eius
          vero dolorem itaque vel labore omnis saepe quis ullam porro
          consectetur aspernatur ratione dicta accusantium? Quo aliquid error
          consequuntur, delectus labore magni ipsa provident tempore debitis
          quibusdam itaque maiores nobis. Libero tempora dignissimos asperiores
          voluptas eius?
        </Text>
        <Divider />
      </VStack>
    </VStack>
  )
}

export default ViewRequestedAppointment
