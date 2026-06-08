import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MAISON — Fine Dining Restaurant",
  description: "Experience exceptional cuisine at MAISON. Locally sourced ingredients, artisan techniques, and an unforgettable atmosphere. Reserve your table today.",
  keywords: ["restaurant", "fine dining", "MAISON", "gourmet", "reservation"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
