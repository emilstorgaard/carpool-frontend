import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Carpool",
  description: "Carpool",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="mb-24">
          <Header />
          <div>
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
