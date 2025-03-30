import type { Metadata } from "next";
import {  Mona_Sans} from "next/font/google";
import "./globals.css";


const monosans = Mona_Sans({
  variable:"--font-mono-sans",
  subsets:["latin"]
})
export const metadata: Metadata = {
  title: "S3-Quiz",
  description: "Quizz online assessment grades quizz qustions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${monosans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
