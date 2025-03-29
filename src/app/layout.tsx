import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Reduxprovider from "../components/provider/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Job Management System",
  description: "Manage job postings, track applications, and find the perfect candidates with our powerful hiring platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` antialiased ${inter.className}`}>
        <Reduxprovider>{children}</Reduxprovider>

        <Toaster />
      </body>
    </html>
  );
}
