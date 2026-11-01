import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scan2Save — Your campus emergency card",
  description: "Essential emergency information, one scan away.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
