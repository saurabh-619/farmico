import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

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
}

const AppButton: React.FC<IAppButtonProps> = ({
  loading = false,
  text,
  onClick,
  width = "",
  variant = "solid",
  btnColor = "",
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
      className="action-btn"
      color={textColor}
      disabled={loading}
      variant={variant}
      onClick={onClick}
      {...props}
    >
      {loading ? <Spinner color="white" /> : text}
    </Button>
  );
};

export default AppButton;
