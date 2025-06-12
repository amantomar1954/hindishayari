import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import Header from "@/components/header/Header";
import Footerpage from "@/components/footer/Footerpage";
const sans = GeistSans
const mono = GeistMono

export const metadata = {
  title: 'Hindi Shayarii',
  description: 'A collection of Hindi Shayaris',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <Header/>
        {children}
        <Footerpage/>
        </body>
    </html>
  )
}