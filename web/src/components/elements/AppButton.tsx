import { Button, Spinner } from "@chakra-ui/react";
import React from "react";

interface IAppButtonProps {
  loading?: boolean;
  text: string;
  onClick?: () => void;
  width?: string;
  btnColor?: string;
  textColor?: string;
  py?: string;
  px?: string;
  variant?: "solid" | "outline" | "ghost" | "link";
  [x: string]: any;
}

const AppButton: React.FC<IAppButtonProps> = ({
  loading = false,
  text,
  onClick,
  width = "",
  variant = "solid",
  btnColor = "brand.600",
  textColor = "white",
  py = "4",
  px = "3",
  ...props
}) => {
  return (
    <Button
      py={py}
      px={px}
      type="submit"
      w={width}
      isLoading={loading}
      borderRadius="4px"
      color={textColor}
      disabled={loading}
      variant={variant}
      onClick={onClick}
      bg={btnColor}
      _hover={{ opacity: 0.8 }}
      {...props}
    >
      {loading ? <Spinner color="white" /> : text}
    </Button>
  );
};

export default AppButton;
