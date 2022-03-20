import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import Head from "next/head"
import { useRouter } from "next/router"
import React from "react"
import { FaChevronLeft } from "react-icons/fa"

const ViewMessageSection = () => {
  const router = useRouter()

  return (
    <VStack
      bgColor="white"
      w="full"
      align="start"
      py={10}
      px={10}
      shadow="sm"
      rounded="sm"
    >
      <Head>
        <title>View Message | Dashboard</title>
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
        <VStack w="full" align="start" spacing={0} fontSize={14} pb={3}>
          <HStack fontSize={14}>
            <Text fontWeight="semibold">Sandip Sadhukhan</Text>
            <Text color="gray" fontSize={13}>
              (sandip.sendme@gmail.com) to
            </Text>
            <Text fontWeight="semibold">me</Text>
          </HStack>
          <Text color="gray.400" fontWeight="light">
            2018-03-23 21:35:00
          </Text>
        </VStack>
        <Divider />
        <Text
          textAlign="justify"
          py={3}
          fontSize={14}
          lineHeight="tall"
          letterSpacing="wide"
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor
          laboriosam consectetur est explicabo dolores, iure, ipsum sequi esse,
          minus quasi eos maxime suscipit rerum eius excepturi corrupti. Dolor
          architecto nulla beatae recusandae qui maxime! Voluptatem quo fugiat
          asperiores amet veniam expedita labore corrupti vero voluptas dicta
          officiis, eos nobis exercitationem ipsum saepe atque perferendis nisi?
          Iste excepturi iure minima. Voluptatem neque mollitia hic, eius vero
          dolorem itaque vel labore omnis saepe quis ullam porro consectetur
          aspernatur ratione dicta accusantium? Quo aliquid error consequuntur,
          delectus labore magni ipsa provident tempore debitis quibusdam itaque
          maiores nobis. Libero tempora dignissimos asperiores voluptas eius?
        </Text>
        <Divider />
      </VStack>
    </VStack>
  )
}

export default ViewMessageSection
