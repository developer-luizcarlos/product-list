import type { Metadata } from "next";
import RedHatText from "@/lib/font";
import ContextComponent from "@/context/Context";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${ RedHatText } bg-rose-100`}
      >
        <ContextComponent>
          {children}
        </ContextComponent>
      </body>
    </html>
  );
}
