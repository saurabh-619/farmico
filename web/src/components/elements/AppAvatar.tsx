import Image from "next/image";
import React from "react";

interface IAppAvatar {
  src?: string;
  size?: string;
  width?: string;
}

const AppAvatar: React.FC<IAppAvatar> = ({
  src = "",
  size = "118px",
  children,
  ...props
}) => {
  return (
    <Image
      src={src}
      height={size}
      width={size}
      className="avatar"
      objectFit="cover"
      {...props}
    />
  );
};

export default AppAvatar;
