import React from "react";
import { Link, LinkProps } from "@chakra-ui/react";

interface IAppLink extends LinkProps {
  text?: string;
}

const AppLink = React.forwardRef<LinkProps, IAppLink>(
  ({ text, ...props }, ref) => (
    <Link
      _hover={{
        textDecorationLine: "none",
      }}
      ref={ref}
      {...props}
    >
      {text ? text : props.children}
    </Link>
  )
);

// const AppLink = React.forwardRef(props: IAppLink, ref) => {
//   return <Link>{props.text}</Link>
// }
export default AppLink;
