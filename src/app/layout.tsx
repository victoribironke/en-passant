import type { Metadata } from "next";
import "./globals.css";
import { gt } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Outpost - Chess Game Reviewer",
  description: "Review your chess games with AI-powered analyses.",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "antialiased dark w-full min-h-screen flex items-center justify-center p-6 xl:px-12",
          gt.className
        )}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
