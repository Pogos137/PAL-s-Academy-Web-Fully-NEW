import { ImageResponse } from "next/og";

// Shared 1200×630 social card used for both Open Graph and Twitter.
// Brand: deep emerald field with the gold (#C9A84C) wordmark and tagline.
// Rendered at request time via next/og (Satori), so there is no binary asset to
// maintain. NB: Satori has limited CSS — keep to solid colors, a single
// linear-gradient, borders and flexbox. Avoid layered/`radial-gradient`
// shorthands (they fail to parse).

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "96px",
          position: "relative",
          backgroundColor: "#0C3D32",
          backgroundImage: "linear-gradient(135deg, #0C3D32 0%, #114E40 58%, #0A332A 100%)",
          fontFamily: "Georgia, 'Times New Roman', serif",
          overflow: "hidden"
        }}
      >
        {/* decorative gold rings (echo the site hero) */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 560,
            height: 560,
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.30)"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: -40,
            right: 40,
            width: 360,
            height: 360,
            borderRadius: "50%",
            border: "2px solid rgba(201,168,76,0.18)"
          }}
        />

        <div
          style={{
            fontSize: 30,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#C9A84C",
            fontFamily: "Arial, sans-serif"
          }}
        >
          A Private Tutoring Academy
        </div>

        <div
          style={{
            marginTop: 28,
            fontSize: 104,
            fontWeight: 700,
            color: "#FAF8F4",
            lineHeight: 1.02
          }}
        >
          PAL&rsquo;s Academy
        </div>

        <div
          style={{
            marginTop: 24,
            fontSize: 40,
            color: "#E9E2D2",
            maxWidth: 880,
            lineHeight: 1.2
          }}
        >
          Private tutoring for Grade 9&ndash;12 &amp; first-year university across the GTA.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 96,
            fontSize: 30,
            letterSpacing: 2,
            color: "#C9A84C",
            fontStyle: "italic"
          }}
        >
          Tutoring, refined.
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 84,
            right: 96,
            fontSize: 26,
            color: "#9DBCAE",
            fontFamily: "Arial, sans-serif"
          }}
        >
          palsacademy.ca
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
