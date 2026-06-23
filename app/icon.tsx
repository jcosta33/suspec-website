import { ImageResponse } from "next/og";

// Generated at build (works under output:export) — no logo asset needed. The hermetic seal — a gilt
// ring with an inscribed hexagram and a centred quintessence — on night black; a visual mark, no
// brand text. Emits 192 + 512 (purpose any) — the pair Chrome requires for PWA installability, and
// the favicon Next wires into <head>.
export const dynamic = "force-static";

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

export function generateImageMetadata() {
  return [
    { id: "icon-192", size: { width: 192, height: 192 }, contentType: "image/png" },
    { id: "icon-512", size: { width: 512, height: 512 }, contentType: "image/png" },
  ];
}

export default function Icon({ id }: { id: string }) {
  const dim = id === "icon-192" ? 192 : 512;
  const mark = Math.round(dim * 0.66);
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
        <img src={MARK} width={mark} height={mark} alt="" />
      </div>
    ),
    { width: dim, height: dim }
  );
}
