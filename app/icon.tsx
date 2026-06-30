import { ImageResponse } from "next/og";

// Generated at build (works under output:export) — no logo asset needed. The loop mark
// (spine triangle inscribed in the six-step hexagon) sits on a transparent canvas.
export const dynamic = "force-static";

const MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">` +
      `<defs><linearGradient id="g" x1="16" y1="2" x2="16" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#f0b85c"/><stop offset="0.55" stop-color="#d88a24"/><stop offset="1" stop-color="#bf7927"/></linearGradient></defs>` +
      `<polygon points="16,4.2 26.22,10.1 26.22,21.9 16,27.8 5.78,21.9 5.78,10.1" stroke="url(#g)" stroke-width="1.55" stroke-linejoin="round" opacity="0.64"/>` +
      `<polygon points="26.22,10.1 16,27.8 5.78,10.1" fill="url(#g)" fill-opacity="0.1" stroke="url(#g)" stroke-width="2.05" stroke-linejoin="round"/>` +
      `<circle cx="16" cy="4.2" r="1.05" fill="#080604" stroke="url(#g)" stroke-width="1.12" opacity="0.76"/>` +
      `<circle cx="26.22" cy="21.9" r="1.05" fill="#080604" stroke="url(#g)" stroke-width="1.12" opacity="0.76"/>` +
      `<circle cx="5.78" cy="21.9" r="1.05" fill="#080604" stroke="url(#g)" stroke-width="1.12" opacity="0.76"/>` +
      `<circle cx="26.22" cy="10.1" r="2.08" fill="url(#g)"/>` +
      `<circle cx="16" cy="27.8" r="2.08" fill="url(#g)"/>` +
      `<circle cx="5.78" cy="10.1" r="2.08" fill="url(#g)"/>` +
      `<circle cx="16" cy="16" r="1.65" fill="#d88a24"/>` +
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
