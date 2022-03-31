import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface IAppBadgeProps {
  text: string;
  bg?: string;
  color?: string;
  [x: string]: any;
}
const AppBadge: React.FC<IAppBadgeProps> = ({
  text,
  bg = "brand.main",
  color = "white",
  ...props
}) => {
  return (
    <Box
      h="17px"
      w="auto"
      minW="42px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      borderRadius="full"
      bg={bg}
      color={color}
      {...props}
    >
      <Heading as="h3" fontWeight="medium" color="white" fontSize="xx-small">
        {text}
      </Heading>
    </Box>
  );
};

export default AppBadge;
