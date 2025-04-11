import type { Metadata } from "next";
import merge from "lodash.merge";

type MetadataGenerator = Omit<Metadata, "description" | "title"> & {
  title: string;
  description: string;
  image?: string;
};

const applicationName = "Application Name";
const author: Metadata["authors"] = {
  name: "Name",
  url: "https://localhost:3000/",
};
const publisher = "John";

export const createMetadata = ({
  title,
  description,
  image = "http://localhost:3000/metadata-image.png",
  ...properties
}: MetadataGenerator): Metadata => {
  const parsedTitle = `${title} | ${applicationName}`;
  const defaultMetadata: Metadata = {
    title: parsedTitle,
    description,
    applicationName,
    authors: [author],
    creator: author.name,
    formatDetection: {
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: parsedTitle,
    },
    openGraph: {
      title: parsedTitle,
      description,
      type: "website",
      siteName: applicationName,
      locale: "en_US",
    },
    publisher,
    twitter: {
      card: "summary_large_image",
    },
    icons: {
      icon: [
        {
          url: "/favicon.ico",
        },
      ],
      shortcut: ["/favicon-96x96.png"],
      apple: [{ url: "/apple-touch-icon.png" }],
    },
  };

  const metadata: Metadata = merge(defaultMetadata, properties);

  if (image && metadata.openGraph) {
    metadata.openGraph.images = [
      {
        url: image,
        width: 2226,
        height: 1176,
        alt: title,
      },
    ];
  }

  return metadata;
};
