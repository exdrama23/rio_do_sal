import type { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rio do Sal | Aracaju, Sergipe",
  description:
    "A história, a memória e o presente do Rio do Sal, entre Aracaju e Nossa Senhora do Socorro.",
  openGraph: {
    title: "Rio do Sal | Aracaju, Sergipe",
    description:
      "A história, a memória e o presente do Rio do Sal, entre Aracaju e Nossa Senhora do Socorro.",
    locale: "pt_BR",
    type: "website",
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
