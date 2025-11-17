import type { Metadata } from "next";
import "./globals.scss";
import GlassFilter from "@/components/Navbar/GlassFilter";
import VLibras from "@/components/VLibras/VLibras";

export const metadata: Metadata = {
  title: "MentorIA",
  description:
    "Com a MentorIA, você nunca estará sozinho em sua jornada de aprendizado.",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <GlassFilter />
        <VLibras />
        {children}
      </body>
    </html>
  );
}
