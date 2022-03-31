import useLocale from "@/hooks/useLocale";
import * as appHelpers from "@/utils/helpers";
import { Flex, Heading, Icon } from "@chakra-ui/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";

interface IAppDateProps {
  date: string;
  isTimeString?: boolean;
  size?: string;
  weight?: string;
  color?: string;
  //rest props
  [x: string]: any;
}

const AppDate: React.FC<IAppDateProps> = ({
  date,
  isTimeString = false,
  size = "md",
  weight = "medium",
  color = "gray.600",
  ...props
}) => {
  const { locale } = useLocale();

  return (
    <Flex alignItems="center" {...props}>
      <Icon
        fontSize={size}
        color={color}
        display="flex"
        alignItems="center"
        justifyContent="center"
        as={FiCalendar}
      />
      <Heading as="h3" fontSize={size} fontWeight={weight} color={color} ml="2">
        {isTimeString
          ? appHelpers.getDateTimeString(date, locale)
          : appHelpers.getDateString(date, locale)}
      </Heading>
    </Flex>
  );
};

export default AppDate;
