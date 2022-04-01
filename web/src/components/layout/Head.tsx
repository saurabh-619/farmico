import React from "react";
import { Helmet } from "react-helmet";
import { useRouter } from "next/router";
import useLocale from "@/hooks/useLocale";

interface IHead {
  subtitle?: string;
}

export const Head: React.FC<IHead> = ({ subtitle }) => {
  const { pathname } = useRouter();
  const { locale } = useLocale();

  const seo = {
    title: `Farmico ${subtitle ? "| " + subtitle : ""}`,
    description: "Farmico is an AI based community driven tool for farmers.",
    image: `${process.env.NEXT_PUBLIC_WEB_DOMAIN}/og.png`,
    url: `${process.env.NEXT_PUBLIC_WEB_DOMAIN}${pathname}`,
  };

  return (
    <Helmet title={seo.title} defaultTitle={seo.title} titleTemplate={`%s`}>
      <html lang={locale} />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="icon" type="image/x-icon" href="/logo-1.svg" />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta
        name="google-site-verification"
        content="pfo_pKe7MHI3ukNjelGPi4fHbuREEVgNlw4oxW6n9No"
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <link rel="canonical" href={seo.url} />
    </Helmet>
  );
};
