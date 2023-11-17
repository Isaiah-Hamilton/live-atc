import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.className,
      )}
    >
      <Component {...pageProps} />
    </main>
  );
}
