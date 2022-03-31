import { Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { FiHeart, FiMessageCircle } from "react-icons/fi";

interface IAppStatElement {
  stat: number;
  isLike?: boolean;
  // rest props
  [x: string]: any;
}

const AppStatElement: React.FC<IAppStatElement> = ({
  stat,
  isLike = false,
  ...props
}) => {
  return (
    <Flex alignItems="center" justifyContent="center" {...props}>
      <Icon
        as={isLike ? FiHeart : FiMessageCircle}
        fontSize="md"
        color="text.lighter"
        mr="2"
      />
      <Heading fontWeight="medium" fontSize="sm" color="text.lighter">
        {stat}
      </Heading>
    </Flex>
  );
};

export default AppStatElement;
