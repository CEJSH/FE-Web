import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NextLayout, { NextProvider } from "./providers";
import { GA_ID } from "../lib/gtm/gtm";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { AuthProvider } from "@/shared/components/providers/AuthProvider";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "Lighty",
  description: "소중한 당신의 추억이 빛나도록",
};

export const viewport: Viewport = {
  width: "device-width",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pretendard.variable} antialiased h-full`}>
        <NextProvider>
          <AuthProvider>
            <ProtectedRoute>
              <NextLayout>{children}</NextLayout>
            </ProtectedRoute>
          </AuthProvider>
        </NextProvider>
        <div
          className="fixed left-0 right-0 bottom-0 mx-auto flex justify-center z-10"
          id="root-portal"
        ></div>
      </body>
      <GoogleAnalytics gaId={GA_ID || ""} />
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
    </html>
  );
}
