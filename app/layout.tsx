import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'Labubu Wallpapers',
  description: '高清 Labubu 动态壁纸聚合站',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-97PFDD4QSG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-97PFDD4QSG');
          `}
        </Script>
      </head>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
