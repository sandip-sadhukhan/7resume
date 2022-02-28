import {
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import React, { useState, ChangeEvent } from "react"
import { BiSearch } from "react-icons/bi"

interface SearchBoxProps {
  grayText: string
  secondaryColor: string
}

const SearchBox: React.FC<SearchBoxProps> = (props: SearchBoxProps) => {
  const { grayText, secondaryColor } = props
  const [searchText, setSearchText] = useState("")

  const router = useRouter()
  const username = router.query.username as string

  const onSearch = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault()
    router.push(`/${username}/blog/search/${searchText}`)
  }

  return (
    <VStack w="full" align="start" spacing={6}>
      <Heading fontWeight={400} size="md">
        Search In Blog
      </Heading>
      <form onSubmit={onSearch}>
        <InputGroup size="lg">
          <Input
            type="text"
            placeholder="Search Posts .."
            rounded="full"
            color={grayText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchText(e.target.value)
            }
            value={searchText}
            minLength={3}
          />
          <InputRightElement>
            <IconButton aria-label="Search Btn" type="submit" variant="ghost">
              <BiSearch fontSize={20} color={secondaryColor} />
            </IconButton>
          </InputRightElement>
        </InputGroup>
      </form>
    </VStack>
  )
}

export default SearchBox
