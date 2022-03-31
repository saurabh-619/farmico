import { Heading } from "@chakra-ui/react";
import React from "react";

interface IAppHeadingProps {
  title: string;
  size?: string;
}

const AppHeading: React.FC<IAppHeadingProps> = ({
  title,
  size = "x-large",
}) => {
  return (
    <Heading as="h3" fontSize={size} fontWeight="semibold" color="text.dark">
      {title}
    </Heading>
  );
};

export default AppHeading;
