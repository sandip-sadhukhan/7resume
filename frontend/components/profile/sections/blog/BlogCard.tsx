import { Button, Heading, HStack, Image, Text, VStack } from "@chakra-ui/react"
import Link from "next/link"
import React from "react"
import { AiOutlineEye } from "react-icons/ai"
import { FaFacebookF, FaPinterestP, FaTwitter } from "react-icons/fa"
import { FiBook, FiUser } from "react-icons/fi"
import { GiBackwardTime } from "react-icons/gi"
import TagGroup from "./TagGroup"

interface BlogCardProps {
  grayText: string
  secondaryColor: string
  grayBackground: string
}

const BlogCard: React.FC<BlogCardProps> = (props: BlogCardProps) => {
  const { grayText, secondaryColor, grayBackground } = props
  return (
    <VStack as="main" shadow="lg" flex={7} align="start" borderRadius={5}>
      <Image w="full" src="/blog-img.jpg" alt="Blog Img" />
      <VStack w="full" align="start" px={[2, 2, 2, 8, 10]} py={4}>
        {/* Title and info */}
        <VStack align="start" color={grayText}>
          <Heading as="h1" size="md" pb={2}>
            Transitions In Design
          </Heading>
          <HStack
            spacing={[1, 1, 1, 5, 5]}
            flexDir={["column", "column", "column", "row", "row"]}
            gap={2}
            align="start"
          >
            <HStack>
              <FiUser />
              <Text fontSize={15}>Sandip Sadhukhan</Text>
            </HStack>
            <HStack>
              <GiBackwardTime />
              <Text fontSize={15}>Mar 10, 2019</Text>
            </HStack>
            <Link href="#">
              <a>
                <HStack _hover={{ color: secondaryColor }}>
                  <FiBook />
                  <Text fontSize={15}>Development</Text>
                </HStack>
              </a>
            </Link>
            <HStack>
              <AiOutlineEye />
              <Text fontSize={15}>132</Text>
            </HStack>
          </HStack>
        </VStack>
        {/* Content */}
        <VStack pt={4}>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            natus obcaecati, temporibus distinctio magni molestiae nam
            laboriosam perspiciatis molestias! Nemo, ut laborum officia impedit
            fuga magni expedita, voluptatem enim cum recusandae possimus omnis
            nostrum perferendis a nesciunt facilis, inventore placeat nobis quam
            fugit aut consectetur! Cupiditate nemo quia deleniti aliquid, minus
            dolorum animi temporibus nisi quos quibusdam obcaecati, tempore
            neque? Aspernatur officiis nam iste eaque soluta sed fugit eum porro
            assumenda rem, facilis sunt corporis ea voluptas quis atque odio
            reiciendis, beatae necessitatibus! Ipsa enim cum eius quaerat! Quos
            enim qui at in debitis, nesciunt itaque cupiditate excepturi ipsam
            natus!
          </Text>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            natus obcaecati, temporibus distinctio magni molestiae nam
            laboriosam perspiciatis molestias! Nemo, ut laborum officia impedit
            fuga magni expedita, voluptatem enim cum recusandae possimus omnis
            nostrum perferendis a nesciunt facilis, inventore placeat nobis quam
            fugit aut consectetur! Cupiditate nemo quia deleniti aliquid, minus
            dolorum animi temporibus nisi quos quibusdam obcaecati, tempore
            neque? Aspernatur officiis nam iste eaque soluta sed fugit eum porro
            assumenda rem, facilis sunt corporis ea voluptas quis atque odio
            reiciendis, beatae necessitatibus! Ipsa enim cum eius quaerat! Quos
            enim qui at in debitis, nesciunt itaque cupiditate excepturi ipsam
            natus!
          </Text>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            natus obcaecati, temporibus distinctio magni molestiae nam
            laboriosam perspiciatis molestias! Nemo, ut laborum officia impedit
            fuga magni expedita, voluptatem enim cum recusandae possimus omnis
            nostrum perferendis a nesciunt facilis, inventore placeat nobis quam
            fugit aut consectetur! Cupiditate nemo quia deleniti aliquid, minus
            dolorum animi temporibus nisi quos quibusdam obcaecati, tempore
            neque? Aspernatur officiis nam iste eaque soluta sed fugit eum porro
            assumenda rem, facilis sunt corporis ea voluptas quis atque odio
            reiciendis, beatae necessitatibus! Ipsa enim cum eius quaerat! Quos
            enim qui at in debitis, nesciunt itaque cupiditate excepturi ipsam
            natus!
          </Text>
          <Text textAlign="justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            natus obcaecati, temporibus distinctio magni molestiae nam
            laboriosam perspiciatis molestias! Nemo, ut laborum officia impedit
            fuga magni expedita, voluptatem enim cum recusandae possimus omnis
            nostrum perferendis a nesciunt facilis, inventore placeat nobis quam
            fugit aut consectetur! Cupiditate nemo quia deleniti aliquid, minus
            dolorum animi temporibus nisi quos quibusdam obcaecati, tempore
            neque? Aspernatur officiis nam iste eaque soluta sed fugit eum porro
            assumenda rem, facilis sunt corporis ea voluptas quis atque odio
            reiciendis, beatae necessitatibus! Ipsa enim cum eius quaerat! Quos
            enim qui at in debitis, nesciunt itaque cupiditate excepturi ipsam
            natus!
          </Text>
        </VStack>
        {/* tags */}
        <VStack pt={3} w="full" align="start">
          <Heading fontWeight={700} as="h5" size="sm" pb={2}>
            Tags
          </Heading>
          <TagGroup
            bg={grayBackground}
            tags={["Tutorial", "Development", "School", "React"]}
          />
        </VStack>
        {/* Social Share */}
        <HStack py={6} spacing={3}>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="blue"
          >
            <HStack spacing={1}>
              <FaFacebookF />
              <Text>Share</Text>
            </HStack>
          </Button>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="cyan"
          >
            <HStack spacing={1}>
              <FaTwitter />
              <Text>Tweet</Text>
            </HStack>
          </Button>
          <Button
            as="a"
            href="#"
            target="_blank"
            rounded="full"
            size="sm"
            px={4}
            variant="outline"
            colorScheme="red"
          >
            <HStack spacing={1}>
              <FaPinterestP />
              <Text>Pin</Text>
            </HStack>
          </Button>
        </HStack>
      </VStack>
    </VStack>
  )
}

export default BlogCard
