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
import { signup } from "../auth/actions"
import { withAuth } from "../auth/context"
import NotAuth from "../components/hocs/not-auth"
import { IAction, IState } from "../types/auth"

interface SignUpProps {
  state: IState
  dispatch: Dispatch<IAction>
}

const SignUp: NextPage<SignUpProps> = (props: SignUpProps) => {
  const outerBg = useColorModeValue("gray.100", "gray.800")
  const innerBg = useColorModeValue("white", "gray.700")
  const headingColor = useColorModeValue("#63B3ED", "aqua")

  const router = useRouter()
  const toast = useToast()

  interface IFormData {
    name: string
    username: string
    email: string
    password: string
    confirmPassword: string
  }

  const [formData, setFormData] = useState<IFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState<boolean>(false)

  const { name, username, email, password, confirmPassword } = formData

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e: FormEvent<HTMLDivElement>) => {
    e.preventDefault()
    setLoading(true)
    // check both passwords
    if (password !== confirmPassword) {
      toast({
        title: "Both Passwords didn't match!",
        variant: "top-accent",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } else {
      const [success, message] = await signup(
        username,
        name,
        email,
        password,
        props.dispatch
      )
      if (success) {
        toast({
          title: "Signup Successfully!",
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
    }
    setLoading(false)
  }

  if (props.state.loading === false && props.state.isAuthenticated === true) {
    router.push("/dashboard")
  }

  return (
    <NotAuth>
      <HStack w="full" minH="100vh" py={5} px={3} bgColor={outerBg}>
        <Head>
          <title>SignUp Page | Resume Bus</title>
          <meta name="description" content="Signup and create your portfolio" />
          <link rel="icon" href="/favicon.png" />
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
                SIGNUP
              </Heading>
            </VStack>
            <VStack
              onSubmit={onSubmit}
              as="form"
              spacing={4}
              w="full"
              align="start"
            >
              <Input
                type="text"
                placeholder="Full Name"
                rounded="none"
                name="name"
                value={name}
                onChange={onChange}
                required
                minLength={3}
                disabled={loading}
              />
              <Input
                rounded="none"
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                onChange={onChange}
                required
                minLength={3}
                disabled={loading}
              />
              <Input
                rounded="none"
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onChange}
                required
                minLength={6}
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
                minLength={6}
                disabled={loading}
              />
              <Input
                rounded="none"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                required
                minLength={6}
                disabled={loading}
              />
              <Text>
                By creating your account, you are agree to our{" "}
                <Link href="/terms-and-conditions">
                  <a style={{ color: headingColor }}>Terms and Condition</a>
                </Link>{" "}
                &#38;{" "}
                <Link href="/privacy-policy">
                  <a style={{ color: headingColor }}>Privacy Policy</a>
                </Link>
              </Text>
              <Button
                type="submit"
                w="full"
                bgColor={headingColor}
                color="black"
                rounded="none"
                isLoading={loading}
                loadingText="Signing Up..."
              >
                <HStack>
                  <AiOutlineUnlock />
                  <Text>SIGNUP</Text>
                </HStack>
              </Button>
              <Text alignSelf="center">
                Already Have any account?{" "}
                <Link href="/login">
                  <a style={{ color: headingColor }}>Login Here</a>
                </Link>
              </Text>
            </VStack>
          </VStack>
        </Center>
      </HStack>
    </NotAuth>
  )
}

export default withAuth(SignUp)
