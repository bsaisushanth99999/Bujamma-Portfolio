import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import LayoutWrapper from "../components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Teju's Portfolio",
  description: "Done by her HUSBAND!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          <ClientLayout>{children}</ClientLayout>
        </LayoutWrapper>
      </body>
    </html>
  );
}
