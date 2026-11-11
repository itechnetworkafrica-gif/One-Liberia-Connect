import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/SiteShell";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://1liberia.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "One Liberia Connect | In the Community, Built by the Diaspora",
    template: "%s | One Liberia Connect",
  },
  description:
    "One Liberia Connect works with communities, schools, diaspora organizations, and partners to plan affordable internet access across Liberia.",
  openGraph: {
    type: "website",
    siteName: "One Liberia Connect",
    title: "One Liberia Connect",
    description:
      "In the Community, Built by the Diaspora. Expanding access to learning and economic opportunity across Liberia.",
    url: siteUrl,
    images: [{ url: "/images/mission.jpg", width: 812, height: 1024 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "One Liberia Connect",
    description:
      "In the Community, Built by the Diaspora. Expanding access to learning and economic opportunity across Liberia.",
    images: ["/images/mission.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "One Liberia Connect",
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  slogan: "In the Community, Built by the Diaspora.",
  parentOrganization: {
    "@type": "Organization",
    name: "One Liberia Enterprise Corporation",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.variable}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema).replace(/</g, "\\u003c"),
          }}
        />
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
