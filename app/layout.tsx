import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteMenu } from "@/components/site-menu";
import { profile, siteDescription } from "@/lib/content";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Self-hosted variable font (from @fontsource-variable/figtree), so builds
// don't need to reach Google Fonts. Exposed to CSS as --font-figtree.
const figtree = localFont({
  src: "../node_modules/@fontsource-variable/figtree/files/figtree-latin-wght-normal.woff2",
  variable: "--font-figtree",
  weight: "300 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: profile.name, template: `%s | ${profile.name}` },
  description: siteDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={figtree.variable} data-scroll-behavior="smooth">
      <SpeedInsights />
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteMenu />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
