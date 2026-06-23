import { ImageResponse } from "next/og";

// Generated at build (works under output:export) — no logo asset needed. The hex "drone" mark in
// corpus-yellow on chassis black; a visual mark, no brand text. Emits 192 + 512 (purpose any) — the
// pair Chrome requires for PWA installability, and the favicon Next wires into <head>.
export const dynamic = "force-static";

const MARK =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">` +
      `<path d="M16 6L26 11V21L16 26L6 21V11L16 6Z" stroke="#FACC15" stroke-width="1.5" stroke-linejoin="round"/>` +
      `<path d="M16 6V26M6 11L26 21M26 11L6 21" stroke="#FACC15" stroke-width="1.5" stroke-linecap="round"/>` +
      `<circle cx="16" cy="16" r="3" fill="#FACC15"/>` +
      `<path d="M16 2V6M16 26V30M2 16H6M26 16H30" stroke="#FACC15" stroke-width="1.5" stroke-linecap="round"/>` +
      `</svg>`,
  );

export function generateImageMetadata() {
  return [
    {
      id: "icon-192",
      size: { width: 192, height: 192 },
      contentType: "image/png",
    },
    {
      id: "icon-512",
      size: { width: 512, height: 512 },
      contentType: "image/png",
    },
  ];
}

export default function Icon({ id }: { id: string }) {
  const dim = id === "icon-192" ? 192 : 512;
  const mark = Math.round(dim * 0.66);
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A08",
      }}
    >
      <img src={MARK} width={mark} height={mark} alt="" />
    </div>,
    { width: dim, height: dim },
  );
}
