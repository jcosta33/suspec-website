import { ImageResponse } from "next/og";

// Generated at build (works under output:export) — no logo asset needed. The loop mark
// (spine triangle inscribed in the six-step hexagon) sits on a transparent canvas.
export const dynamic = "force-static";

const MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">` +
      `<circle cx="16" cy="16" r="15.05" stroke="#d88a24" stroke-width="1.85"/>` +
      `<polygon points="16,2.55 27.65,9.28 27.65,22.72 16,29.45 4.35,22.72 4.35,9.28" stroke="#d88a24" stroke-width="1.45" stroke-linejoin="round" opacity="0.52"/>` +
      `<polygon points="27.65,9.28 16,29.45 4.35,9.28" fill="#d88a24" fill-opacity="0.95" stroke="#d88a24" stroke-width="1.05" stroke-linejoin="round"/>` +
      `<circle cx="16" cy="16.2" r="2.85" fill="#100b07"/>` +
      `</svg>`
  );

export function generateImageMetadata() {
  return [
    { id: "icon-192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "icon-512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default async function Icon({ id }: { id: Promise<string> }) {
  const resolvedId = await id;
  const dim = resolvedId === "icon-192" ? 192 : 512;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <img src={MARK} width={dim} height={dim} alt="" />
      </div>
    ),
    { width: dim, height: dim }
  );
}
