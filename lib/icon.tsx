import { ImageResponse } from "next/og";

/** Purple "M." monogram used for the browser/search favicon and the home-screen icon. */
export function renderIcon(px: number) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f4eff9",
          fontSize: px * 0.62,
          fontWeight: 700,
          background: "linear-gradient(135deg, #3b2370, #8253c8)",
        }}
      >
        M
        <span style={{ color: "#f5d9a5" }}>.</span>
      </div>
    ),
    { width: px, height: px }
  );
}
