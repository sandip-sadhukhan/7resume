import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { ChangeEvent, Dispatch, FormEvent, useState } from "react"
import { AiOutlineUnlock } from "react-icons/ai"
import { RiUserFill } from "react-icons/ri"
import { login } from "../auth/actions"
import { withAuth } from "../auth/context"
import { IAction, IState } from "../types/auth"

interface LoginProps {
  state: IState
  dispatch: Dispatch<IAction>
}

const Login: NextPage<LoginProps> = (props: LoginProps) => {
  const outerBg = useColorModeValue("gray.100", "gray.800")
  const innerBg = useColorModeValue("white", "gray.700")
  const headingColor = useColorModeValue("#63B3ED", "aqua")

  const toast = useToast()

  const router = useRouter()

  const { state, dispatch } = props

  interface IFormData {
    email: string
    password: string
  }

  const [formData, setFormData] = useState<IFormData>({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState<boolean>(false)

  const { email, password } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    setLoading(true)
    const [success, message] = await login(email, password, dispatch)
    if (success) {
      toast({
        title: message,
        status: "success",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      })
    } else {
      toast({
        title: message,
        status: "error",
        variant: "top-accent",
        duration: 3000,
        isClosable: true,
      })
    }
    setLoading(false)
  }

  if (state.loading === false && state.isAuthenticated === true) {
    router.push("/dashboard")
  }

  return (
    <HStack w="full" minH="100vh" py={10} px={3} bgColor={outerBg}>
      <Head>
        <title>Login Page | Resume Bus</title>
      </Head>
      <Center
        mx="auto"
        bgColor={innerBg}
        borderRadius={10}
        shadow="lg"
        w={["100%", "100%", "100%", "40%", "35%"]}
        justifyContent="center"
        alignItems="center"
      >
        <VStack p={10} w="full" spacing={10}>
          <VStack spacing={4}>
            <RiUserFill fontSize={45} color={headingColor} />
            <Heading
              color={headingColor}
              size="lg"
              fontWeight={400}
              letterSpacing="wide"
            >
              LOGIN
            </Heading>
          </VStack>
          <VStack spacing={4} w="full" as="form" onSubmit={onSubmit}>
            <Input
              rounded="none"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={onChange}
              required
              disabled={loading}
            />
            <Input
              rounded="none"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              required
              disabled={loading}
            />
            <Button
              w="full"
              bgColor={headingColor}
              color="black"
              rounded="none"
              type="submit"
              loadingText="Logging Up..."
              isLoading={loading}
            >
              <HStack>
                <AiOutlineUnlock />
                <Text>LOGIN</Text>
              </HStack>
            </Button>
            <Text>
              Don&apos;t Have any account?{" "}
              <Link href="/signup">
                <a style={{ color: headingColor }}>Signup Here</a>
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Center>
    </HStack>
  )
}

export default withAuth(Login)
