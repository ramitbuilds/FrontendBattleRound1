import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata = {
  title: "Armory | AI Data Automation",
  description:
    "AI-powered data automation for teams that build, automate, and optimize data pipelines in minutes.",
  openGraph: {
    title: "Armory | AI Data Automation",
    description:
      "Build, automate, and optimize data pipelines in minutes with AI-powered data automation.",
    type: "website"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{
          __html: "(function(){var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)})()"
        }} />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
