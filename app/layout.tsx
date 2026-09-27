import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/TrustStrip";
import { MobileTabBar } from "@/components/MobileTabBar";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SHOP, siteUrl } from "@/lib/shop";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-jakarta", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SHOP.name} – Sell Old Phone, Mobile Repair & Used Phones in Cheyyar`,
    template: `%s | ${SHOP.name}, Cheyyar`,
  },
  description:
    "Sell your old phone for instant cash, get expert mobile repairs (display, battery, charging port, water damage) and buy certified second-hand phones at 46 Loganadhan Street, Cheyyar.",
  keywords: ["sell old phone Cheyyar", "mobile service Cheyyar", "mobile repair Cheyyar", "second hand mobile Cheyyar", "display replacement Cheyyar", "Sri Siddhi Ganesh Mobiles"],
  icons: { icon: "/icon.svg" },
  openGraph: { type: "website", locale: "en_IN", siteName: SHOP.name, images: ["/logo.svg"] },
};

export const viewport: Viewport = { themeColor: "#163a24", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MobilePhoneStore", "LocalBusiness"],
  name: SHOP.legalName,
  url: siteUrl,
  telephone: `+91${SHOP.phone}`,
  image: `${siteUrl}/logo.svg`,
  priceRange: "₹₹",
  founder: SHOP.owner,
  address: {
    "@type": "PostalAddress",
    streetAddress: SHOP.street,
    addressLocality: SHOP.city,
    addressRegion: SHOP.state,
    postalCode: SHOP.pincode,
    addressCountry: "IN",
  },
  areaServed: SHOP.serviceArea,
  openingHours: "Mo-Su 09:30-21:30",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="min-h-dvh pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary focus:shadow-float">
          Skip to main content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">{children}</main>
        <TrustStrip />
        <Footer />
        <WhatsAppFab />
        <MobileTabBar />
      </body>
    </html>
  );
}
