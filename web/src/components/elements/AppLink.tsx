import { Link, LinkProps } from "@chakra-ui/react";
import React from "react";

interface IAppLink extends LinkProps {
  text?: string;
}

export default React.forwardRef<LinkProps, IAppLink>(
  ({ text, ...props }, ref) => (
    <Link
      _hover={{
        textDecorationLine: "none",
      }}
      // @ts-ignore
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
// export default AppLink;
