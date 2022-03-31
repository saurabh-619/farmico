import { Flex, Icon } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";

interface IAdminBadgeProps {
  size?: string;
  iconSize?: string;
  borderSize?: string;
  [x: string]: any;
}

const AdminBadge: React.FC<IAdminBadgeProps> = ({
  size = "34px",
  iconSize = "14px",
  borderSize = "4px",
  ...props
}) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h={size}
      w={size}
      boxShadow="2xl"
      borderRadius="full"
      bg="success.400"
      bottom="1"
      right="1"
      pos="absolute"
      border={borderSize}
      borderColor="white"
      {...props}
    >
      <Icon as={AiFillStar} color="white" fontSize={iconSize} />
    </Flex>
  );
};

export default AdminBadge;
