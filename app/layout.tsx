import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MalluKey | Malayalam Typing Speed Test & Keyboard",
  description: "Test and improve your Malayalam typing speed. ⚡ Fast, secure, and accurate Malayalam Keyboard (WPM tracking). Compete on the Top 10 global leaderboard today!",
  keywords: [
    "malayalam typing",
    "mallu keyboard",
    "malayalam speed test",
    "typing competition",
    "online malayalam keyboard",
    "malayalam typing practice",
    "WPM test malayalam",
    "learn malayalam typing"
  ],
  authors: [{ name: "MalluKey" }],
  creator: "MalluKey",
  publisher: "MalluKey",
  openGraph: {
    title: "MalluKey | Malayalam Typing Speed Test",
    description: "The ultimate Malayalam typing competition & practice tool. Track your WPM, learn the exact custom keyboard layout, and rule the global Top 10 leaderboard.",
    url: "https://mallukey.vercel.app", // Replace with your actual domain when you get one!
    siteName: "MalluKey",
    type: "website",
    locale: "ml_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MalluKey | Malayalam Typing Speed Test",
    description: "Test your Malayalam typing speed and compete against the world! Can you hit the Top 10?",
    creator: "@mallukey",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    }
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <Script id="bmc-widget" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: `
          var script = document.createElement("script");
          script.src = "https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js";
          script.setAttribute("data-name", "BMC-Widget");
          script.setAttribute("data-cfasync", "false");
          script.setAttribute("data-id", "hizoxilsij");
          script.setAttribute("data-description", "Support me on Buy me a coffee!");
          script.setAttribute("data-message", "");
          script.setAttribute("data-color", "#B3F023");
          script.setAttribute("data-position", "Right");
          script.setAttribute("data-x_margin", "18");
          script.setAttribute("data-y_margin", "18");
          document.body.appendChild(script);
        ` }} />
      </body>
    </html>
  );
}
