import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
