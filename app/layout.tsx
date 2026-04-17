import type { Metadata } from "next";
import "./globals.css";
import ClientInit from "./client-init";

export const metadata: Metadata = {
  title: "Bank App",
  description: "Banking System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientInit />
        {children}
      </body>
    </html>
  );
}