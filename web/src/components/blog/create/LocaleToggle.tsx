import * as appHelpers from "@/utils/helpers";
import { BLOG_LOCALE_TYPE } from "@/utils/types";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

interface ILocaleToggleProps {
  locale: BLOG_LOCALE_TYPE;
  setLocale: React.Dispatch<React.SetStateAction<BLOG_LOCALE_TYPE>>;
}

const LocaleToggle: React.FC<ILocaleToggleProps> = ({ locale, setLocale }) => {
  const toggle = () => {
    if (locale === BLOG_LOCALE_TYPE.ENGLISH) {
      setLocale(BLOG_LOCALE_TYPE.MARATHI);
    } else if (locale === BLOG_LOCALE_TYPE.MARATHI) {
      setLocale(BLOG_LOCALE_TYPE.HINDI);
    } else {
      setLocale(BLOG_LOCALE_TYPE.ENGLISH);
    }
  };

  return (
    <Box
      py="2.5"
      px="2"
      width="80px"
      borderRadius="5px"
      onClick={toggle}
      className="cursor"
      display="flex"
      justifyContent="center"
      _hover={{ backgroundColor: "text.100" }}
    >
      <Heading as="h2" fontWeight="semibold" fontSize="lg">
        {appHelpers.getLocaleString(locale)}
      </Heading>
    </Box>
  );
};

export default LocaleToggle;
