import type { Metadata } from "next";
import "./globals.css";
import { ProgressProvider } from "@/lib/progress/ProgressProvider";
import { GlobalNav } from "@/components/GlobalNav";

export const metadata: Metadata = {
  title: "BTC PM Placement Prep Roadmap",
  description: "A 6-week, trackable roadmap to build product judgment and get interview ready.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ProgressProvider>
          <GlobalNav />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}
