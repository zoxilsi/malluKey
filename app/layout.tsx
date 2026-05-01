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
  title: "MalluKey | Malayalam Typing Speed Test & WPM Keyboard",
  description: "Improve your Malayalam typing speed with MalluKey. Free online WPM test, Malayalam keyboard practice & global leaderboard. The best alternative to monkeytype for Malayalam.",
  keywords: [
    "malayalam typing",
    "malayalam typing website",
    "malayalam keyboard",
    "malayalam typing test",
    "malayalam speed test",
    "malayalam WPM test",
    "monkeytype malayalam",
    "monkeytype alternative",
    "malayalam typing practice",
    "type in malayalam",
    "malayalam typing competition",
    "online malayalam keyboard",
    "malayalam english keyboard",
    "malayalam typing master",
    "type mallu",
    "mallu keyboard",
    "malayalam touch typing",
    "malayalam tutor",
    "malayalam typing game",
    "malayalam typing exam",
    "malayalam WPM",
    "malayalam typing speed",
    "free malayalam keyboard",
    "download malayalam keyboard",
    "malayalam transliteration",
    "malayalam input method",
    "kerala keyboard",
    "keralatype",
    "malayalam online",
    "malayalam internet typing",
    "typing test malayalam",
    "typing competition malayalam",
    "malayalam typing tool",
    "malayalam typing trainer"
  ],
  authors: [{ name: "Zoxilsi" }],
  creator: "Zoxilsi",
  publisher: "Zoxilsi",
  openGraph: {
    title: "MalluKey | Malayalam Typing Speed Test",
    description: "Test your Malayalam typing speed and compete on the global leaderboard. Fast, secure, and accurate.",
    url: "https://mallukey.vercel.app",
    siteName: "MalluKey",
    type: "website",
    locale: "ml_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "MalluKey | Malayalam Typing Speed Test",
    description: "Test your Malayalam typing speed and compete on the global leaderboard.",
    creator: "@zoxilsi",
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
