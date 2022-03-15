import { ISubtitleProps } from "@/utils/types";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { getLocal } from "./../utils/helpers";

interface IHome {}

const Home: NextPage<IHome> & ISubtitleProps = () => {
  const { locale } = useRouter();
  const t = getLocal(locale);

  return (
    <div>
      <h1
        style={{
          fontWeight: "bold",
          fontSize: 50,
        }}
      >
        {t?.welcome}
      </h1>
    </div>
  );
};

Home.subtitle = "Home";

export default Home;
