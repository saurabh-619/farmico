import { Box } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import AdminBadge from "../profile/AdminBadge";

interface IAppAvatar {
  src?: string;
  size?: string;
  badgeSize?: string;
  borderSize?: string;
  iconSize?: string;
  right?: string;
  bottom?: string;
  isAdmin?: boolean;
  [x: string]: any;
}

const AppAvatar: React.FC<IAppAvatar> = ({
  src = "",
  size = "118px",
  right = "-8px",
  bottom = "0px",
  badgeSize = "18px",
  borderSize = "2px",
  iconSize = "10px",
  isAdmin = false,
  children,
  ...props
}) => {
  return (
    <Box pos="relative" display={"flex"}>
      <Image
        src={src}
        height={size}
        width={size}
        className="avatar"
        objectFit="cover"
        priority={true}
        alt="app avatar"
        {...props}
      />
      {isAdmin && (
        <AdminBadge
          right={right}
          bottom={bottom}
          size={badgeSize}
          borderSize={borderSize}
          iconSize={iconSize}
        />
      )}
    </Box>
  );
};

export default AppAvatar;
