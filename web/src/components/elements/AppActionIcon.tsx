import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";

interface IAppActionIcon {
  icon: IconType;
  iconClassName?: string;
  color?: string;
}

const AppActionIcon: React.FC<IAppActionIcon> = ({
  icon,
  iconClassName = "app-action-icon",
  color = "text.dark",
}) => {
  return (
    <Box
      h="9"
      w="9"
      borderRadius="lg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={`cursor ${iconClassName}`}
      mr="2"
    >
      <Icon as={icon} fontSize="md" color={color} />
    </Box>
  );
};

export default AppActionIcon;
