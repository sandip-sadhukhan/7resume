import {
  Button,
  Divider,
  HStack,
  Input,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import Image from "../../../image"
import React, { ChangeEvent, FormEvent, useState } from "react"

const WebsiteSettings: React.FC = () => {
  const textColor = useColorModeValue("gray.700", "gray.100")

  interface IFormData {
    siteTitle: ""
    webmasterEmail: ""
    favicon: ""
    startPageBackground: ""
    aboutMeImage: ""
    contactFormImage: ""
  }

  const [formData, setFormData] = useState<IFormData>({
    siteTitle: "",
    webmasterEmail: "",
    favicon: "",
    startPageBackground: "",
    aboutMeImage: "",
    contactFormImage: "",
  })

  const {
    siteTitle,
    webmasterEmail,
    favicon,
    startPageBackground,
    aboutMeImage,
    contactFormImage,
  } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()

    // submit
  }

  return (
    <VStack w="full" align="start" spacing={4} color={textColor}>
      {/* Site Title */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
        as="form"
        onSubmit={onSubmit}
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Site Title
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="text"
            placeholder="Name"
            name="siteTitle"
            value={siteTitle}
            onChange={onChange}
          />
        </HStack>
      </HStack>

      <Divider />

      {/* Webmaster email*/}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Webmaster Email
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="email"
            placeholder="Webmaster Email"
            name="webmaterEmail"
            value={webmasterEmail}
            onChange={onChange}
          />
        </HStack>
      </HStack>

      <Divider />

      {/* Favicon */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Favicon
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="favicon"
            value={favicon}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/mailbox.png" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>

      <Divider />

      {/* Favicon */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Start Page Background
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="startPageBackground"
            value={startPageBackground}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/mailbox.png" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>

      <Divider />

      {/* About Me Image */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDirection={["column", "column", "row", "row", "row"]}
        gap={2}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          About Me Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="aboutMeImage"
            value={aboutMeImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/mailbox.png" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>

      <Divider />

      {/* Contact Form Image */}
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>

      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>
      <HStack
        w="full"
        spacing={[0, 0, 2, 2, 2]}
        flexDir={["column", "column", "row", "row", "row"]}
        gap={3}
        align="start"
        alignItems="center"
      >
        <Text
          fontSize={14}
          w={["full", "full", 50, 100, 150]}
          textAlign={["start", "start", "end", "end", "end"]}
        >
          Contact Form Image
        </Text>
        <HStack w="full" flex={1}>
          <Input
            size="sm"
            w="full"
            type="file"
            placeholder="Favicon"
            name="contactFormImage"
            value={contactFormImage}
            onChange={onChange}
          />
        </HStack>
        <HStack px={4} align="start" w={["full", "full", 40, 40, 40]}>
          <Image src="/avatar-1.jpg" alt="favicon" width={40} height={40} />
        </HStack>
      </HStack>

      <Divider />

      <HStack
        w={["full", "full", 200, 245, 295]}
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

export default WebsiteSettings
