import React from "react"
import { useSiteMetadata } from "@hooks"

export const SEO = ({ title, description, pathname, children }) => {
  const { title: defaultTitle, description: defaultDescription, image, siteUrl } = useSiteMetadata();

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    url: `${siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="url" content={seo.url} />
      <meta name="author" content="Daniel Oropeza" />
      <meta name="keyword" content="Daniel Oropeza" />
      <meta name="keywords" content="Daniel Oropeza" />
      {children}
    </>
  )
}