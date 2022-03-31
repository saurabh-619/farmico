import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

interface IAppButtonProps {
  loading?: boolean;
  text: string;
}

const AppFormButton: React.FC<IAppButtonProps> = ({ loading, text }) => {
  return (
    <Button
      py="4"
      px="3"
      mt="5"
      type="submit"
      variant="solid"
      w="full"
      isLoading={loading}
      bg="brand.600"
      borderRadius="2px"
      color="white"
      disabled={loading}
      _hover={{ opacity: 0.8 }}
      _active={{ opacity: 0.8 }}
    >
      {loading ? <Spinner color="white" /> : text}
    </Button>
  );
};

export default AppFormButton;
