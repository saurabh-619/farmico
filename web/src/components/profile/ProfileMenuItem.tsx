import React, { useCallback } from "react";
import { useRouter } from "next/router";
import { Heading } from "@chakra-ui/react";

interface IProfileMenuItemProps {
  type?: string;
  text: string;
  currentType?: string;
}

const ProfileMenuItem: React.FC<IProfileMenuItemProps> = ({
  type,
  text,
  currentType = "",
}) => {
  const router = useRouter();

  const isSelected = currentType === type;

  return (
    <Heading
      as="h4"
      fontSize="16px"
      fontWeight="normal"
      my="1"
      px="3"
      py="2"
      minW="125px"
      backgroundColor={isSelected ? "bg.main" : ""}
      color="text.main"
      borderRadius="3px"
      className="cursor"
      onClick={() =>
        router.replace(
          `/profile${type === undefined ? "" : `?type=${type}`}`,
          undefined,
          { shallow: true }
        )
      }
    >
      {text}
    </Heading>
  );
};

export default ProfileMenuItem;
