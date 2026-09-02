import {
  createOgImageResponse,
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
} from "@/seo/og-image";

export const alt = ogImageAlt;
export const contentType = ogImageContentType;
export const size = ogImageSize;

export default createOgImageResponse;
