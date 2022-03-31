import useLocale from "@/hooks/useLocale";
import * as appHelpers from "@/utils/helpers";
import { BLOG_LOCALE_TYPE, LocaleType } from "@/utils/types";
import { Button, Heading, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiGlobe } from "react-icons/fi";

const LanguageSwitch: React.FC = () => {
  const { locale: currLocale, locales, t } = useLocale();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState(
    currLocale as LocaleType
  );

  const handleLocaleChange = (e: any) => {
    let newLocale: LocaleType = "en";
    if (selectedOption === BLOG_LOCALE_TYPE.ENGLISH) {
      newLocale = BLOG_LOCALE_TYPE.MARATHI;
      setSelectedOption(BLOG_LOCALE_TYPE.MARATHI);
    } else if (selectedOption === BLOG_LOCALE_TYPE.MARATHI) {
      newLocale = BLOG_LOCALE_TYPE.HINDI;
      setSelectedOption(BLOG_LOCALE_TYPE.HINDI);
    } else {
      newLocale = BLOG_LOCALE_TYPE.ENGLISH;
      setSelectedOption(BLOG_LOCALE_TYPE.ENGLISH);
    }
    router.push(router.asPath, undefined, { locale: newLocale });
  };

  return (
    <Button
      mt={4}
      aria-label="Toggle Language"
      onClick={handleLocaleChange}
      display="flex"
      justifyContent="flex-start"
      alignItems="center"
      p="2"
      width="100px"
    >
      <Icon size={22} as={FiGlobe} color="text.light" />
      <Heading fontWeight="medium" fontSize="md" color="text.light" ml="1.5">
        {appHelpers.getLocaleString(selectedOption as LocaleType)}
      </Heading>
    </Button>
  );
};

export default LanguageSwitch;
