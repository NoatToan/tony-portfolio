import { ImageResponse } from "next/og";
import type { PortfolioContent } from "@/content";

export const ogSize = { width: 1200, height: 630 };

export function renderOg(content: PortfolioContent | null) {
  const title = content?.profile.name ?? "Tony Nguyen";
  const role = content?.profile.role ?? "Software Engineer";
  const tags = content ? content.techStack.flatMap((g) => g.items.map((i) => i.name.split(" · ")[0])).slice(0, 5) : [];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0a0a0a",
          color: "#ededed",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#2dd4bf" }}>
          {content ? `~/${content.slug}` : "~/portfolio"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2 }}>{title}</div>
          <div style={{ fontSize: 38, color: "#a3a3a3", marginTop: 16 }}>{role}</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                border: "1px solid #333",
                borderRadius: 999,
                padding: "8px 20px",
                fontSize: 22,
                color: "#a3a3a3",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    ogSize,
  );
}
