import { ImageResponse } from "next/og";

// Apple touch icon (home-screen on iOS) — generated at build, the hermetic seal on night, padded.
export const dynamic = "force-static"; // required for output:export (generated at build, not runtime)
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">` +
      `<circle cx="16" cy="16" r="13.6" stroke="#c9a24a" stroke-width="1.4"/>` +
      `<path d="M16 4.5 L25.96 21.75 L6.04 21.75 Z" stroke="#c9a24a" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<path d="M16 27.5 L6.04 10.25 L25.96 10.25 Z" stroke="#c9a24a" stroke-width="1.4" stroke-linejoin="round"/>` +
      `<circle cx="16" cy="16" r="2.2" fill="#ebd08a"/>` +
      `</svg>`
  );

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#06070e",
        }}
      >
        <img src={MARK} width={118} height={118} alt="" />
      </div>
    ),
    { ...size }
  );
}
