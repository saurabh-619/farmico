import { ISubtitleProps } from "@/utils/types";
import { NextPage } from "next";
import React from "react";

const About: NextPage & ISubtitleProps = () => {
  return <div>About</div>;
};

About.subtitle = "About";

export default About;
