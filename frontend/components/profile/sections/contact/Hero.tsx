import {
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react"
import React, { ChangeEvent, useState } from "react"
import { useRouter } from "next/router"
import axios from "../../../../utils/axiosInstance"
import { AxiosError } from "axios"

interface Props {
  secondaryColor: string
  contact_form_image: string
}

const Hero = (props: Props) => {
  const username = useRouter().query.username as string
  const toast = useToast()

  interface FormType {
    name: string
    email: string
    message: string
  }

  const [formData, setFormData] = useState<FormType>({
    name: "",
    email: "",
    message: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  const onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({ ...formData, [e.target?.name]: e.target?.value })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const url = `/api/profile/${username}/contact-me/send/`

      await axios.post(
        url,
        {
          ...formData,
        },
        config
      )

      toast({
        title: "Done",
        description: "Message sent successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      })
    } catch (error) {
      const err = error as AxiosError

      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      })
    }
    setFormData({ name: "", email: "", message: "" })
    setLoading(false)
  }

  return (
    <HStack
      py={10}
      gap={4}
      spacing={[0, 0, 2, 4, 8]}
      flexDir={["column", "column", "column", "row", "row"]}
      w="full"
    >
      <Flex>
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_API_URL}${props.contact_form_image}`}
          alt="MailBox"
        />
      </Flex>
      <Flex>
        <form onSubmit={onSubmit}>
          <Input
            type="text"
            variant="flushed"
            placeholder="Name"
            required
            mb={8}
            size="lg"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
          <Input
            type="email"
            variant="flushed"
            placeholder="Email"
            size="lg"
            required
            mb={8}
            name="email"
            value={formData.email}
            onChange={onChange}
          />
          <Textarea
            rows={6}
            size="lg"
            variant="flushed"
            placeholder="Message"
            required
            mb={8}
            name="message"
            value={formData.message}
            onChange={onChange}
          />
          <Button
            size="lg"
            w="full"
            type="submit"
            bgColor={props.secondaryColor}
            color="white"
            isLoading={loading}
            loadingText="Sending"
          >
            Send Message
          </Button>
        </form>
      </Flex>
    </HStack>
  )
}

export default Hero
