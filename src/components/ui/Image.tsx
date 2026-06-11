import NextImage, { type ImageProps } from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Image({ src, ...props }: ImageProps) {
  let normalizedSrc = src;
  if (typeof src === "string" && src.startsWith("/") && !src.startsWith(basePath)) {
    normalizedSrc = `${basePath}${src}`;
  }
  return <NextImage {...props} src={normalizedSrc} />;
}
