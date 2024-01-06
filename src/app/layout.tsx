import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Header } from '@/components/header/header'
import { Footer } from '@/components/footer/footer'
import { ReduxProvider } from '@/redux/reduxProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    
    <ReduxProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}      
          <Footer />
        </body>
      </html>
    </ReduxProvider>
  )
}
