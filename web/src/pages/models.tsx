import React from "react";
import withAuth from "@/lib/withAuth";
import { ISubtitleProps } from "@/utils/types";
import { NextPage } from "next";

const Models: NextPage & ISubtitleProps = () => {
  return <div>Models</div>;
};
Models.subtitle = "AI Models";

export default withAuth(Models);
