import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/oswald";
import "./globals.css";
import { CartProvider } from "@/components/cart";
import { Header, Footer } from "@/components/shell";
import { siteOrigin } from "@/lib/business";
export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: {
    default: "Кофе-брейк — сделай паузу, возьми кофе",
    template: "%s · Кофе-брейк",
  },
  description:
    "Демонстрационная концепция кофейни «Кофе-брейк» на Полярной, 1, Москва. 28 позиций меню, кофе с собой, зерно и демо-предзаказ.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Кофе-брейк · демо",
    title: "Сделай паузу. Возьми кофе.",
    description: "Кофейня на Полярной, 1. Демонстрационная концепция сайта.",
    images: [
      {
        url: "/images/hero.webp",
        width: 1536,
        height: 1024,
        alt: "Кофе с собой — демонстрационная визуализация",
      },
    ],
  },
  icons: { icon: "/favicon.svg" },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f2e9",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
