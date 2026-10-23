import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** The social-share card shown when the site is linked on WhatsApp, X, LinkedIn, etc. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          color: "#f4eff9",
          background:
            "radial-gradient(ellipse at 85% 10%, rgba(144,91,225,.45), transparent 55%), radial-gradient(ellipse at 10% 95%, rgba(78,52,143,.5), transparent 55%), #0d0b12",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 8,
            color: "#b99bf0",
            marginBottom: 28,
          }}
        >
          WRITER · CREATIVE MIND
        </div>
        <div style={{ display: "flex", fontSize: 148, fontWeight: 700, lineHeight: 1 }}>
          Meghna Bose
          <span style={{ color: "#a678ee" }}>.</span>
        </div>
        <div style={{ display: "flex", fontSize: 38, color: "#cbbfdc", marginTop: 36 }}>
          Author of A World Seen at Eighteen
        </div>
        <div
          style={{
            display: "flex",
            width: 140,
            height: 4,
            marginTop: 44,
            background: "linear-gradient(90deg, #6841a7, #a678ee)",
          }}
        />
      </div>
    ),
    ogSize
  );
}
