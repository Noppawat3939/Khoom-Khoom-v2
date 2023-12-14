import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/provider";

const kanit = Kanit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Khoom Khoom | Find the best product price for you.",
  description: "Compare the value of the products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={kanit.className}>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
