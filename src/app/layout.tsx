import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MasjidFinder - Temukan Masjid dengan Info Lengkap",
  description:
    "Cari masjid terdekat dengan informasi detail AC, kebersihan wudhu, dan fasilitas lainnya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <html lang="en">
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </>
  );
}
