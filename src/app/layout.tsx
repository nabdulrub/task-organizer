import "./global.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Organizer",
  description: "Organize all your tasks quickly!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className={cn(inter.className, "antialiased min-h-screen p-8")}>
          <Navbar />
          <div className="max-w-7xl">{children}</div>
        </body>
      </Providers>
    </html>
  );
}
