import { Button } from "@chakra-ui/react"
import React from "react"

interface SaveButtonProps {
  isSubmitting: boolean
  isLoading: boolean
}

const SaveButton: React.FC<SaveButtonProps> = (props: SaveButtonProps) => {
  const { isSubmitting, isLoading } = props

  return (
    <Button
      type="submit"
      colorScheme="green"
      rounded={0}
      size="sm"
      isLoading={isSubmitting || isLoading}
      loadingText={isLoading ? "Loading" : "Saving"}
    >
      Save
    </Button>
  )
}

export default SaveButton
