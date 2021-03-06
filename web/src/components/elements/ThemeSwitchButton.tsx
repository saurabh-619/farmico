import { IconButton } from "@chakra-ui/button";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode } from "@chakra-ui/react";

const ThemeSwitchButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton mt={4} aria-label="Toggle Mode" onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </IconButton>
  );
};

export default ThemeSwitchButton;
