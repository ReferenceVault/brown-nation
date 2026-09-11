import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { fetchAllCategories } from "@/lib/api/public/categories";
import { fetchActiveAnnouncement } from "@/lib/api/public/announcements";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Brown Nation Chocolates | Handcrafted With Love",
  description:
    "Indulge in handcrafted chocolates made with premium ingredients and endless passion.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [categories, announcement] = await Promise.all([
    fetchAllCategories().catch(() => []),
    fetchActiveAnnouncement().catch(() => null),
  ]);

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${poppins.variable} h-full antialiased`}
      style={{ "--font-script": "'Dancing Script', cursive" } as React.CSSProperties}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-cream text-espresso">
        <SiteChrome categories={categories} announcement={announcement}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
