import { ImageResponse } from "next/og";

import { SITE } from "@/constants/site";

export const ogImageSize = {
  height: 630,
  width: 1200,
} as const;

export const ogImageContentType = "image/png";

export const ogImageAlt = SITE.NAME;

export const OgImage = () => (
  <div
    style={{
      alignItems: "center",
      background: "#faf9f7",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "center",
      width: "100%",
    }}
  >
    <div
      style={{
        color: "#181818",
        fontSize: 72,
        fontWeight: 700,
        letterSpacing: "-0.04em",
        lineHeight: 1,
      }}
    >
      {SITE.NAME}
    </div>
    <div
      style={{
        color: "#6b7280",
        fontSize: 32,
        lineHeight: 1.4,
        marginTop: 24,
        maxWidth: 900,
        textAlign: "center",
      }}
    >
      {SITE.DESCRIPTION.SHORT}
    </div>
  </div>
);

export const createOgImageResponse = () =>
  new ImageResponse(<OgImage />, { ...ogImageSize });
