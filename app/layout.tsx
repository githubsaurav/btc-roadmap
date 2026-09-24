import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BTC PM Placement Prep Roadmap",
  description: "A 6-week, trackable roadmap to build product judgment and get interview ready.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
